const mongoose = require("mongoose");
require("dotenv").config()
const DataBase = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connection is establised now ', connect.connection.host, connect.connection.name)
    } catch (error) {
        console.log(`Erroe is coming from Config`, error);
        process.exit(1)
    }
}

module.exports = DataBase