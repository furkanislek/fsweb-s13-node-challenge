const express = require("express");
const {
  validateActionsWithId,
  validateActions,
} = require("../actions/actions-middlware");
const ActionsModel = require("./actions-model");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  ActionsModel.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: "Gönderiler alınamadı" });
    });
});

router.get("/:id", validateActionsWithId, (req, res, next) => {
  res.json(req.actions);
  next();
});

router.post("/", validateActions, async (req, res, next) => {
  try {
    ActionsModel.insert(req.body).then((newAction) => {
      res.status(201).json(newAction);
    });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:id",
  validateActions,
  validateActionsWithId,
  async (req, res, next) => {
    try {
      await ActionsModel.update(req.params.id, req.body);
      res.status(200).json(await ActionsModel.get(req.params.id));
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", validateActionsWithId, async (req, res, next) => {
  try {
    await ActionsModel.remove(req.params.id);
    res.json(req.actions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
