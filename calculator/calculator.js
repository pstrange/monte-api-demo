const Loans = require("../model/loans")

exports.calculator = async (req, res, next) => {
    const { identifier, weight } = req.body
    try {
        await Loans.findOne({ identifier })
          .then((reference) => {
            console.log(reference)
              res.status(201).json({
                  message: "Success",
                  result: {
                        total: (weight * reference.price) * 0.8
                  }
              });
          })
          .catch((error) =>
              res.status(400).json({
                  message: "Can't find element with this identifier",
                  error: error.message,
              })
          );
    } catch (err) {
      res.status(401).json({
        message: "Error to find element with this identifier",
        error: error.mesage,
      })
    }
}