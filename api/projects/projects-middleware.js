// projects ara yazılımları buraya
const Projects = require("../projects/projects-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();

  console.log(`${timestamp} ${method} ${url}`);

  next();
}

async function validateProjectWithId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (!project) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      req.project = project;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "İşlem Yapılamadı.",
    });
  }
}

function validateProjects(req, res, next) {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({
        message: "gerekli name alanı eksik",
      });
    } else {
      req.name = name;
      req.description = description;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "İşlem Yapılamadı.",
    });
  }
}

module.exports = {
  logger,
  validateProjectWithId,
  validateProjects,
};
