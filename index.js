const express = require('express');
const DataBase = require('./Config/DataBase');
const cors = require("cors")
const errorHandler = require('./middleware/errorHander');
require("dotenv").config()
const app = express();
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())
app.use("/task", require("./Routes/TaskRoute"))
app.use("/user", require("./Routes/UserRoute"))
app.use(errorHandler)
app.listen(PORT, () => {
    try {
        DataBase()
        console.log(`Server Starts on PORT - ${PORT}`)
    } catch (error) {
        console.log(`error is coming from index`, error)
    }
})