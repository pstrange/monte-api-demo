const Mongoose = require("mongoose")
const LoansSchema = new Mongoose.Schema({
  identifier: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
})

const Loans = Mongoose.model("loans", LoansSchema)
module.exports = Loans