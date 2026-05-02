const logger = require("../logger");
exports.testapi = async (req, res, next) => {
  logger.info("testapi called");
  res.status(200).json({ message: "Hello World" });
};
