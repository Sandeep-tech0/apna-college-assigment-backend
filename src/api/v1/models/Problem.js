const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    level: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true,
    },
    youtubeLink: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    leetcodeLink: {
        type: String,
    },
    codeforcesLink: {
        type: String,
    },
    articleLink: {
        type: String,
    },
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

const Problem = mongoose.model('Problem', ProblemSchema);

module.exports = Problem; 