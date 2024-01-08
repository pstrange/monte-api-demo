const express = require("express")
const connectDB = require("./database")
const { adminAuth, userAuth } = require("./middleware/auth.js");
const cookieParser = require("cookie-parser")
const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", require("./auth/route"))
app.use("/api/loans", userAuth, require("./loans/route"))
app.use("/api/loans", userAuth, require("./calculator/route"))

const server = app.listen(PORT, () => {
  console.log(`Server Connected to port ${PORT}`)
  connectDB()
})

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})