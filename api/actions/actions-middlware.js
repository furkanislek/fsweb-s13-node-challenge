// eylemlerle ilgili ara katman yazılımları yazın
const Actions = require("../actions/actions-model");

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toLocaleString();

  console.log(`${timestamp} ${method} ${url}`);

  next();
}

async function validateActionsWithId(req, res, next) {
  try {
    const actions = await Actions.get(req.params.id);
    if (!actions) {
      res.status(404).json({
        message: "Not Found",
      });
    } else {
      req.actions = actions;
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: "İşlem Yapılamadı.",
    });
  }
}

function validateActions(req, res, next) {
  try {
    const { project_id, description, notes } = req.body;

    if (!notes || !description || !project_id) {
      res.status(400).json({
        message: "gerekli alanlar eksik",
      });
    } else {
      if (description.length > 128)
        res.status(400).json({ message: "128 karakterden uzun olmamalı" });
      else {
        req.notes = notes;
        req.description = description;
        req.project_id = project_id;
      }
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
  validateActionsWithId,
  validateActions,
};
