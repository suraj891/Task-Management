const express = require("express");
const { Current_user, Login, Register } = require("../Controllers/UserControllers");
const vaildateToken = require("../middleware/VaildateToken");
const router = express.Router();

router.get('/current', vaildateToken, Current_user).post('/login', Login).post("/register", Register);


module.exports = router