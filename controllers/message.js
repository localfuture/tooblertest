const Message = require('../models/message');

exports.getMessage = (req, res) => {
    res.render('message');
}

exports.saveMessage = (req,res) => {
    const message = new Message({
        messageText: req.body.messageText,
        totalMessageCount: req.body.totalMessageCount,
        sendMessageCount: req.body.sendMessageCount,
        messageSendCount: req.body.message,
        recipientCount: req.body.recipientCount
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: "createdMessage added successfully",
                menu: {
                    ...createdMessage,
                    id: createdMessage._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Creating a Message failed!"
            });
        });
}
