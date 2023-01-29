// "project" routerını buraya yazın!
const express = require("express");
const {
  logger,
  validateProjectWithId,
  validateProjects,
} = require("../projects/projects-middleware");
const PM = require("./projects-model");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  PM.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderiler alınamadı" });
    });
});

router.get("/:id", validateProjectWithId, (req, res, next) => {
  res.json(req.project);
  next();
});

router.post("/", validateProjects, async (req, res, next) => {
  try {
    PM.insert(req.body).then((newProject) => {
      res.status(201).json(newProject);
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateProjects,
  validateProjectWithId,

  async (req, res, next) => {
    try {
      await PM.update(req.params.id, req.body);
      res.status(200).json(await PM.get(req.params.id));
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateProjectWithId, async (req, res, next) => {
  try {
    await PM.remove(req.params.id);
    res.json(req.project);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/actions", validateProjectWithId, async (req, res, next) => {
    try {
        const actionsPost = await PM.getProjectActions(req.params.id);
        res.json(actionsPost);
      } catch (err) {
        next(err);
      }
})

module.exports = router;
