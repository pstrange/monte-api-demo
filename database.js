const Mongoose = require("mongoose")
const dotenv = require('dotenv')

const connectDB = async () => {
  dotenv.config()
  await Mongoose.connect(
    `${process.env.MONGODB_SCHEMA}://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_NAME}`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
  )
  console.log("MongoDB Connected")
}
module.exports = connectDB