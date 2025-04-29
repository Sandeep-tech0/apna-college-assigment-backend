const Response = require("../middlewares/response");
const progressReportService = require("../services/progressReportService");

const progressReportController = {
    // Get overall progress report
    async getProgressReport(req, res) {
        try {
            const report = await progressReportService.getProgressReport();
            return Response.success(res, "Progress report generated successfully", report);
        } catch (error) {
            return Response.error(res, error.message);
        }
    },

 
};

module.exports = progressReportController; 