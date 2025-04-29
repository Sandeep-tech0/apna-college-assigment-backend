const Problem = require('../models/Problem');
const Topic = require('../models/Topic');
const UserProgress = require('../models/UserProgress');
const User = require('../models/User');

const progressReportService = {
    // Get progress report by difficulty level
    async getProgressReport() {
        try {
            // Get total count of problems by difficulty
            const totalProblems = await Problem.aggregate([
                { $match: { isActive: true } },
                {
                    $group: {
                        _id: '$level',
                        total: { $sum: 1 }
                    }
                }
            ]);

            // Get count of completed problems by difficulty
            const completedProblems = await Problem.aggregate([
                { 
                    $match: { 
                        isActive: true,
                        status: 'Completed'
                    }
                },
                {
                    $group: {
                        _id: '$level',
                        completed: { $sum: 1 }
                    }
                }
            ]);

            // Initialize counters for each difficulty
            const report = {
                Easy: { total: 0, completed: 0, percentage: 0 },
                Medium: { total: 0, completed: 0, percentage: 0 },
                Hard: { total: 0, completed: 0, percentage: 0 }
            };

            // Process total problems
            totalProblems.forEach(item => {
                if (report[item._id]) {
                    report[item._id].total = item.total;
                }
            });

            // Process completed problems
            completedProblems.forEach(item => {
                if (report[item._id]) {
                    report[item._id].completed = item.completed;
                }
            });

            // Calculate percentages
            Object.keys(report).forEach(level => {
                const { total, completed } = report[level];
                report[level].percentage = total > 0 
                    ? Math.round((completed / total) * 100) 
                    : 0;
            });

            // Return only the percentages
            return {
                Easy: `${report.Easy.percentage}%`,
                Medium: `${report.Medium.percentage}%`,
                Hard: `${report.Hard.percentage}%`
            };
        } catch (error) {
            throw new Error('Error generating progress report: ' + error.message);
        }
    },

   

    // Update user progress for a problem
    async updateUserProgress(userId, problemId, isCompleted) {
        try {
            // Get the problem to get its topic
            const problem = await Problem.findById(problemId);
            if (!problem) {
                throw new Error('Problem not found');
            }

            // Find or create user progress
            let progress = await UserProgress.findOne({
                user: userId,
                problem: problemId
            });

            if (!progress) {
                progress = new UserProgress({
                    user: userId,
                    problem: problemId,
                    topic: problem.topic,
                    isCompleted: isCompleted
                });
            } else {
                progress.isCompleted = isCompleted;
                progress.updatedAt = new Date();
                if (isCompleted && !progress.completedAt) {
                    progress.completedAt = new Date();
                }
            }

            await progress.save();
            return progress;
        } catch (error) {
            throw new Error('Error updating user progress: ' + error.message);
        }
    }
};

module.exports = progressReportService; 