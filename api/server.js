const express = require('express');

const projectRouter = require("./projects/projects-router");
const actionRouter = require("./actions/actions-router");

const server = express();

server.use("/api/projects", projectRouter);
server.use("/api/actions", actionRouter);

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
