const express = require("express");
const ENDPOINT = "/api/v1";
const auth = require("./auth");
 const  topic = require('./topicRoutes')
 const  problem = require('./progressReportRoutes')

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(ENDPOINT + `/auth`, auth);
  app.use(ENDPOINT + `/topic`, topic);
  app.use(ENDPOINT + `/progress-reports`, problem);
};
