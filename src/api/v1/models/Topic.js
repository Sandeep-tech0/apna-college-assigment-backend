const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending',
    },
    problems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem'
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

const Topic = mongoose.model('Topic', TopicSchema);

module.exports = Topic;


