const express = require("express");
const { PollModel } = require("../model/poll.model");

const pollRouter = express.Router()


// Create a new poll
pollRouter.post('/create', async (req, res) => {
  try {
    const newPoll = await PollModel.create(req.body);
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a list of available polls
pollRouter.get('/', async (req, res) => {
  try {
    const polls = await PollModel.find();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Vote on a poll
pollRouter.post('/:pollId/vote', async (req, res) => {
  const { pollId } = req.params;
  const { optionIndex } = req.body;

  try {
    const poll = await PollModel.findById(pollId);

    if (!poll) {
      return res.status(404).json({ error: 'Poll not found' });
    }

    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      return res.status(400).json({ error: 'Invalid option index' });
    }

    poll.options[optionIndex].votes += 1;

    await poll.save();

    res.status(200).json(poll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = {
  pollRouter
}