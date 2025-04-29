const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: true,
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    completedAt: {
        type: Date,
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

// Create a compound index to ensure unique user-problem combinations
UserProgressSchema.index({ user: 1, problem: 1 }, { unique: true });

const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

module.exports = UserProgress; 