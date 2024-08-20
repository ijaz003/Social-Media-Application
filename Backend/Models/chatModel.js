const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String, 
        ref: 'User', // Assuming there's a User model
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    users: [{
        type: String, 
        ref: 'User',
        required: true
    }],
    messages: [messageSchema], // Embedded array of messages
    lastMessage: messageSchema, // Keep track of the last message
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

chatSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
