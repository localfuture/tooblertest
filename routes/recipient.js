var express = require('express');
var router = express.Router();

var recipientController = require("../controllers/recipent");

router.get('/', recipientController.getRecipient);
router.get('/message', recipientController.messageDetails);
router.post('/save', recipientController.storeRecipients);
router.get('/all', recipientController.recipientDetails);
router.get('/single/:id', recipientController.singleUpdate);
router.post('/update', recipientController.update);

module.exports = router;
