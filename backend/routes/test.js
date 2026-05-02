const express = require("express");
const { testapi } = require("../controllers/test");
const router = express.Router();

router.get("/test", testapi);

module.exports = router;
