var express = require('express');
var router = express.Router();

var recipientController = require("../controllers/recipent");

router.get('/', recipientController.getRecipient);

module.exports = router;
