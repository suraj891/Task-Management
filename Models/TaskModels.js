const mongoose = require("mongoose");


const TaskSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'Please add the user name']
    },
    description: {
        type: String,
        required: [true, 'Please add the user email'],
        unique: [true, 'Eamil address already teken or exist']
    },
    date: {
        type: String,
        required: [true, 'Please add the user password']
    },
    status: {
        type: Boolean,
        required: [true, 'Please add the user password']
    }
});

const TaskModel = mongoose.model("managements", TaskSchema);

module.exports = TaskModel


