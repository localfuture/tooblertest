var express = require('express');
var router = express.Router();

var messageController = require("../controllers/message");

router.get('/', messageController.getMessage);
router.post('/save', messageController.saveMessage);

module.exports = router;
