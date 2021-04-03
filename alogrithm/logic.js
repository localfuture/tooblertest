const Message = require('../models/message')
const Recipient = require('../models/recipient');

var totalMessage = 0;
var sendMessage = 0;
var frequencyCount = 0;
var recipientCount = 0;

exports.logic = async () => {
    await getMessageDetails();
    await getRecipient();
    await sendMessageCount();
}

function getMessageDetails() {
    Message.findOne()
    .then(message => {
        if (message) {
           console.log(message);
           totalMessage = message.totalMessageCount;
           sendMessage = message.sendMessageCount;
           frequencyCount = message.messageSendCount;
           recipientCount = message.recipientCount;
        }
    })
    .catch(error => {
        console.log('error message: '+ error);
    });
}

function getRecipient() {
    Recipient.find()
    .then(recipient => {
        if (recipient) {
            console.log(recipient)
        }
    })
    .catch(error => {
        console.log('error recipient: ' + error);
    });
}

function sendMessageCount() {

}
