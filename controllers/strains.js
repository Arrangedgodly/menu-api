const Strain = require("../models/strain");
const PermissionsError = require("../errors/permissions-err");
const NotFoundError = require("../errors/not-found-err");
const BadRequestError = require("../errors/bad-request-err");

module.exports.getStrains = (req, res, next) => {
  Strain.find({})
    .then((strains) => res.send(strains))
    .catch(next);
};

module.exports.getStrain = (req, res, next) => {
  const { strainId } = req.params;
  Strain.findById(strainId)
    .then((strain) => {
      if (!strain) {
        throw new NotFoundError("Strain not found.");
      }
      return res.send(strain);
    })
    .catch(next);
}

module.exports.createStrain = (req, res, next) => {
  const { name, tier, type, quantity } = req.body;
  Strain.create({ name, tier, type, quantity })
    .then((strain) => res.send(strain))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("There was an error creating the strain.");
      }
    })
    .catch(next);
};

module.exports.deleteStrain = (req, res, next) => {
  const { strainId } = req.params;
  Strain.findById(strainId)
    .then((strain) => {
      if (!strain) {
        throw new NotFoundError("Strain not found.");
      }
      return Strain.deleteOne(strain);
    })
    .then(() => res.send({ message: "Strain deleted." }))
    .catch(next);
};

module.exports.updateStrain = (req, res, next) => {
  const { strainId } = req.params;
  const { name, tier, type, quantity } = req.body;
  Strain.findById(strainId)
    .then((strain) => {
      if (!strain) {
        throw new NotFoundError("Strain not found.");
      }
      return Strain.findByIdAndUpdate(
        strainId,
        { name, tier, type, quantity },
        { new: true }
      );
    })
    .then((strain) => res.send(strain))
    .catch((err) => {
      if (err.name === "ValidationError") {
        throw new BadRequestError("There was an error updating the strain.");
      }
    });
};
