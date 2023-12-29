const mongoose = require("mongoose");

const pollSchma = mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    options:[{
        optionText:String,
        votes:{
            type:Number,
            default:0
        }
    }]
});

const PollModel = mongoose.model("Poll", pollSchma);

module.exports={
    PollModel
}