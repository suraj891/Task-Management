const asynchandler = require("express-async-handler")
const Task = require("../Models/TaskModels")
// @ GET ALL TASKS
// @ MOTHED [GET] - GET
// @ PUBLIC [ACCESS]


const Get_Tesks = asynchandler(async (req, res) => {
    const Tasks = await Task.find({ user_id: req.user.id });
    res.status(200).json(Tasks)
})
// @  GET SINGLE TASKS
// @ MOTHED [GET] - API/TASK/ID
// @ PUBLIC [ACCESS]

const Get_Tesk = asynchandler(async (req, res) => {
    const Single_Task = await Task.findById(req.params.id);
    if (!Single_Task) {
        res.status(404);
        throw new Error("Not found or worng id")
    }
    res.status(200).json(Single_Task);
})


// @  CREATE NEW TASKS
// @ MOTHED [POST] - API/TASK/
// @ PUBLIC [ACCESS]
const Create_Tesk = asynchandler(async (req, res) => {
    const { title, description, date } = req.body;
    console.log('REQUESTED BODY', req.body);
    if (!title || !description || !date) {
        res.status(400);
        res.json({ message: 'ALL FAILED ARE MONDTORY' });
    }


    const taskss = await Task.create({ title, description, date, status: false, user_id: req.user.id });
    res.status(201).json(taskss);
})


// @  UPDATE EXIST TASKS
// @ MOTHED [PUT] - API/TASK/ID
// @ PUBLIC [ACCESS]
const Update_Tesk = asynchandler(async (req, res) => {
    const Single_Task = await Task.findById(req.params.id);
    if (!Single_Task) {
        res.status(404);
        res.json({ message: 'Not Found' });
    }

    if (Single_Task.user_id.toString() !== req.user.id) {
        res.status(403);
        res.json({ message: 'user do not have permission to update other user task' });
    }
    const Updated_Task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(Updated_Task)
})

// @ DELETE EXIST TASKS
// @ MOTHED [DELETE] - API/TASK/ID
// @ PUBLIC [ACCESS]

const Delete_Task = asynchandler(async (req, res) => {
    const Single_Task = await Task.findById(req.params.id);
    if (!Single_Task) {
        res.status(404);
        res.json({ message: 'Not Found' });
    }
    if (Single_Task.user_id.toString() !== req.user.id) {
        res.status(403);
        res.json({ message: 'user do not have permission to update other user task' });
    }
    await Task.deleteOne({ _id: req.params.id })
    res.status(200).json(Single_Task)
})

module.exports = { Get_Tesks, Get_Tesk, Create_Tesk, Update_Tesk, Delete_Task }