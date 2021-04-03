const Message = require('../models/message')
const Recipient = require('../models/recipient');

exports.getRecipient = (req, res) => {
    res.render('recipient');
}

exports.messageDetails = (req, res) => {
    Message.findOne()
    .then(message => {
        if (message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({ message: "message not found!" });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching message failed!"
        });
    });
}
