const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add the user name']
    },
    email: {
        type: String,
        required: [true, 'Please add the user email'],
        unique:[true,'Eamil address already teken or exist']
    },
    password: {
        type: String,
        required: [true, 'Please add the user password']
    }
});

const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;