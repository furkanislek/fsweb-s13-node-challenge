// projects ara yazılımları buraya
const Projects = require("../projects/projects-model");


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
        message: "gerekli alanlar eksik",
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
  validateProjectWithId,
  validateProjects,
};
