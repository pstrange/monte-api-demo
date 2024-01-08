const Loans = require("../model/loans")

exports.create = async (req, res, next) => {
    const { identifier, name, price } = req.body
    try {
        await Loans.create({
            identifier,
            name,
            price
          })
          .then((reference) => {
              res.status(201).json({
                  message: "Object successfully created",
                  result: reference,
              });
          })
          .catch((error) =>
              res.status(400).json({
                  message: "Object not successful created",
                  error: error.message,
              })
          );
    } catch (err) {
      res.status(401).json({
        message: "Object not successful created",
        error: error.mesage,
      })
    }
}

exports.consult = async (req, res, next) => {
    try {
        await Loans.find()
          .then((references) => {
              res.status(201).json({
                  message: "Success",
                  result: references,
              });
          })
          .catch((error) =>
              res.status(400).json({
                  message: "Object not successful created",
                  error: error.message,
              })
          );
    } catch (err) {
      res.status(401).json({
        message: "Object not successful created",
        error: error.mesage,
      })
    }
}