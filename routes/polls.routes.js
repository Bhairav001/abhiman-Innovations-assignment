const express = require("express");

const pollRouter = express.Router()


pollRouter.post('/polls', (req, res) => {
    const { question, options } = req.body;
  
    const insertQuery = 'INSERT INTO polls (question, options) VALUES (?, ?)';
    db.query(insertQuery, [question, JSON.stringify(options)], (err, result) => {
      if (err) {
        console.error('Error creating poll: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Poll created successfully', pollId: result.insertId });
      }
    });
  });
  
  pollRouter.get('/polls', (req, res) => {
    const selectQuery = 'SELECT * FROM polls';
    db.query(selectQuery, (err, rows) => {
      if (err) {
        console.error('Error retrieving polls: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ polls: rows });
      }
    });
  });
  
  // Vote on a poll
  pollRouter.post('/polls/:pollId/vote', (req, res) => {
    const { pollId } = req.params;
    const { userId, choice } = req.body;
  
    const updateQuery = 'UPDATE polls SET votes = JSON_SET(votes, ?,"$number", JSON_EXTRACT(votes, ?) + 1) WHERE id = ?';
    db.query(updateQuery, [`$.${choice}`, `$.${choice}`, pollId], (err, result) => {
      if (err) {
        console.error('Error recording vote: ', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(200).json({ message: 'Vote recorded successfully' });
      }
    });
  });

  module.exports={
    pollRouter
  }