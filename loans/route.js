const express = require("express")
const router = express.Router()
const { create, consult } = require("./loans")

router.route("/catalogue").post(create)
router.route("/catalogue").get(consult)

module.exports = router