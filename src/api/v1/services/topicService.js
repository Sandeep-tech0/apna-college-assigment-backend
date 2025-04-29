const Topic = require('../models/Topic');
const Problem = require('../models/Problem');

const topicService = {
    // Create a new topic
    async createTopic(topicData) {
        const topic = new Topic(topicData);
        return await topic.save();
    },

    // Get all topics
    async getAllTopics() {
        return await Topic.find({ isActive: true })
            .populate('problems')
            .sort({ createdAt: -1 });
    },

    // Get topic by ID
    async getTopicById(topicId) {
        return await Topic.findById(topicId)
            .populate('problems');
    },

    // Update topic
    async updateTopic(topicId, updateData) {
        updateData.updatedAt = new Date();
        return await Topic.findByIdAndUpdate(
            topicId,
            updateData,
            { new: true }
        ).populate('problems');
    },

    // Delete topic (soft delete)
    async deleteTopic(topicId) {
        return await Topic.findByIdAndUpdate(
            topicId,
            { isActive: false, updatedAt: new Date() },
            { new: true }
        );
    },

    // Add problem to topic
    async addProblemToTopic(topicId, problemData) {
        const problem = new Problem({...problemData, topic: topicId});
        await problem.save();
        
        return await Topic.findByIdAndUpdate(
            topicId,
            { $push: { problems: problem._id } },
            { new: true }
        ).populate('problems');
    },

    // Update problem status and check if all problems are completed
    async updateProblemStatus(problemId, status) {
        const problem = await Problem.findByIdAndUpdate(
            problemId,
            { status, updatedAt: new Date() },
            { new: true }
        );

        if (problem) {
            // Get all problems for the topic
            const problems = await Problem.find({ topic: problem.topic });
            
            // Check if all problems are completed
            const allCompleted = problems.every(p => p.status === 'Completed');
            
            // Update topic status based on problem completion status
            const topicStatus = allCompleted ? 'Completed' : 'Pending';
            const updatedTopic = await Topic.findByIdAndUpdate(
                problem.topic,
                { status: topicStatus, updatedAt: new Date() },
                { new: true }
            ).populate('problems');
            
            if (!updatedTopic) {
                throw new Error('Topic not found');
            }
        }

        return problem;
    }
};

module.exports = topicService;
