const Message = require('../models/message');
const Recipient = require('../models/recipient');

exports.getRecipient = (req, res) => {
    res.render('recipient');
}

