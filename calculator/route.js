const express = require("express")
const router = express.Router()
const { calculator } = require("./calculator")

router.route("/calculator").post(calculator)

module.exports = router