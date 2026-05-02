const express = require("express");
const { testapi, testapiPost } = require("../controllers/test");
const router = express.Router();

router.get("/test", testapi);
router.post("/test", testapiPost);

module.exports = router;
