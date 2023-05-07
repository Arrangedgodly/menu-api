const router = require("express").Router();
const {
  getStrains,
  getStrain,
  createStrain,
  deleteStrain,
  updateStrain,
} = require("../controllers/strains");
const auth = require("../middlewares/auth");
const { celebrate, Joi, Segments } = require("celebrate");

router.get("/", getStrains);
router.get("/:strainId", getStrain);
router.post(
  "/",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      tier: Joi.string().required(),
      type: Joi.string().required(),
    }),
  }),
  auth,
  createStrain
);
router.delete("/:strainId", auth, deleteStrain);
router.patch(
  "/:strainId",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      tier: Joi.string(),
      type: Joi.string(),
    }),
  }),
  auth,
  updateStrain
);

module.exports = router;