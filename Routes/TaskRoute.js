const express = require("express");
const { Get_Tesks, Get_Tesk, Create_Tesk, Update_Tesk, Delete_Task } = require("../Controllers/TaskControllers");
const vaildateToken = require("../middleware/VaildateToken");
const router = express.Router();
router.use(vaildateToken)
router.get('/', Get_Tesks).post('/', Create_Tesk)
router.get('/:id', Get_Tesk).put('/:id', Update_Tesk).delete("/:id", Delete_Task);


module.exports = router 