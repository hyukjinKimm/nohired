const logger = require("../logger");
exports.testapi = async (req, res, next) => {
  logger.info("testapi called");
  res.status(200).json({ message: "Hello World" });
};

exports.testapiPost = async (req, res, next) => {
  logger.info("testapiPost called", req.body);
  res.status(200).json({ message: "POST OK", received: req.body });
};
