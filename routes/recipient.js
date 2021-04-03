var express = require('express');
var router = express.Router();

var recipientController = require("../controllers/recipent");

router.get('/', recipientController.getRecipient);
router.get('/message', recipientController.messageDetails);

module.exports = router;
