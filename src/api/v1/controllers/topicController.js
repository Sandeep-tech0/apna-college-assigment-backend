const Response = require("../middlewares/response");
const topicService = require("../services/topicService");

const topicController = {
    // Create a new topic
    async createTopic(req, res) {
        try {
            const topic = await topicService.createTopic(req.body);
            return Response.success(res, "Topic created successfully", topic);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Get all topics
    async getAllTopics(req, res) {
        try {
            const topics = await topicService.getAllTopics();
            return Response.success(res, "Topics retrieved successfully", topics);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Get topic by ID
    async getTopicById(req, res) {
        try {
            const topic = await topicService.getTopicById(req.params.id);
            if (!topic) {
                return Response.error(res, "Topic not found", 404);
            }
            return Response.success(res, "Topic retrieved successfully", topic);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Update topic
    async updateTopic(req, res) {
        try {
            const topic = await topicService.updateTopic(req.params.id, req.body);
            if (!topic) {
                return Response.error(res, "Topic not found", 404);
            }
            return Response.success(res, "Topic updated successfully", topic);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Delete topic
    async deleteTopic(req, res) {
        try {
            const topic = await topicService.deleteTopic(req.params.id);
            if (!topic) {
                return Response.error(res, "Topic not found", 404);
            }
            return Response.success(res, "Topic deleted successfully");
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Add problem to topic
    async addProblemToTopic(req, res) {
        try {
            const topic = await topicService.addProblemToTopic(req.params.id, req.body);
            if (!topic) {
                return Response.error(res, "Topic not found", 404);
            }
            return Response.success(res, "Problem added to topic successfully", topic);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

    // Update problem status
    async updateProblemStatus(req, res) {
        try {
            const problem = await topicService.updateProblemStatus(req.params.problemId, req.body.status);
            if (!problem) {
                return Response.error(res, "Problem not found", 404);
            }
            return Response.success(res, "Problem status updated successfully", problem);
        } catch (error) {
            return Response.error(res, error.message);
        }
    }
};

module.exports = topicController; 