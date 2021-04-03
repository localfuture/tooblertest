const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    messageText: {
        type: String,
        required: true
    },
    totalMessageCount: {
        type: Number,
        required: true,
        default: 0
    },
    sendMessageCount: {
        type: Number,
        required: true,
        default: 0
    },
    messageSendCount: {
        type: Number,
        required: true,
        default: 1
    },
    recipientCount: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model("Messages", messageSchema);
