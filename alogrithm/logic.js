const Message = require('../models/message')
const Recipient = require('../models/recipient');

var totalMessage = 0;
var sendMessage = 0;
var frequencyCount = 0;
var recipientCount = 0;

exports.logic = async () => {
    await getMessageDetails();
}

function getMessageDetails() {
    Message.findOne()
        .then(message => {
            if (message) {
                //console.log(message);
                totalMessage = message.totalMessageCount;
                sendMessage = message.sendMessageCount;
                frequencyCount = message.messageSendCount;
                recipientCount = message.recipientCount;
            }
            sendMessageCheck();
        })
        .catch(error => {
            console.log('error message: ' + error);
        });
}

function sendMessageCheck() {
    if (totalMessage > sendMessage) {
        console.log('message should be send');
        getRecipientDetails();
    } else {
        console.log('messsage should not be send');
    }
}

async function getRecipientDetails() {
    var recipients = [];
    await Recipient.find().then(data => {
        recipients = data;
    });
    await calculateNewMessageCount(recipients);
    await sendMessageToRecipient();
}

function calculateNewMessageCount(recipients) {
    var messagesCount = totalMessage - sendMessage;
    recipients.forEach(element => {
        var newCount = Math.floor((messagesCount * (element.actualPercentage / 100))) + element.totalMessageCount;
        var balanceCount = newCount - element.receviedMessageCount;
        var currentPercentage = element.currentPercentage;
        var receviedMessageCount = element.receviedMessageCount;
        if (balanceCount != 0) {
            currentPercentage = Math.floor((balanceCount / messagesCount) * 100);
        } else {
            currentPercentage = 0;
        }
        updateEachRecipient(element, currentPercentage, newCount, receviedMessageCount, balanceCount);
    });
}

async function sendMessageToRecipient() {
    var messagesCount = totalMessage - sendMessage;
    if (messagesCount >= 1) {
        Recipient.findOne().sort({ balanceMessageCount: -1 })
            .then(element => {
                var newCount = element.totalMessageCount;
                var balanceCount = element.balanceMessageCount;
                if (element.balanceMessageCount > 1) {
                    balanceCount--;
                } else {
                    balanceCount = 0;
                }

                var currentPercentage = element.currentPercentage;
                if (balanceCount != 0) {
                    currentPercentage = Math.floor((balanceCount / messagesCount) * 100);
                } else {
                    currentPercentage = 0;
                }
                var receviedMessageCount = element.receviedMessageCount + 1;
                sendMessage++;
                updateEachRecipient(element, currentPercentage, newCount, receviedMessageCount, balanceCount);
                updateMessageTable();
            });
    }
}


function updateEachRecipient(element, currentPercentage, newCount, receviedMessageCount, balanceCount) {
    const recip = new Recipient({
        _id: element._id,
        recipientName: element.recipientName,
        actualPercentage: element.actualPercentage,
        currentPercentage: currentPercentage,
        totalMessageCount: newCount,
        receviedMessageCount: receviedMessageCount,
        balanceMessageCount: balanceCount
    });
    Recipient.updateOne({ _id: element._id }, recip).then(result => {
        console.log('updated' + result);
    });
}

function updateMessageTable() {
    Message.findOne().then(element => {
        var count = element.sendMessageCount + 1;
        Message.updateOne({ _id: element._id }, { sendMessageCount: count }).then(c => {
            console.log('count updated');
            sendMessageToRecipient();
        });
    });
}
