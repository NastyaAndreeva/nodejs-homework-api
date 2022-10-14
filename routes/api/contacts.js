const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const schema = require("../../schemas/contact");

const validateBody = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schema.addSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put(
  "/:id",
  validateBody(schema.addSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
