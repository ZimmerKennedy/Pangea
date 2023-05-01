const router = require("express").Router();
const {
  models: { Landlord, User },
} = require("../db");
module.exports = router;

router.get("/", async (request, response, next) => {
  try {
    const landlords = await Landlord.findAll();
    response.json(landlords);
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const landlord = await Landlord.findOne({
      where: {
        userId: id,
      }
    });
    console.log(`landlordId`, req.params.id);
    res.send(landlord);
  } catch (err) {
    console.log(`error in single landlord route`, err);
    next(err);
  }
});

router.post("/", async (request, response, next) => {
  console.log(`im request.body`, request.body);
  try {
    const landlord = await Landlord.create(request.body);
    response.json(landlord);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log(`req from landlords`, req.params);
    const landlord = await Landlord.update(
      {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        idForTenantToAssociate: req.body.idForTenantToAssociate,
        address: req.body.address
      },
      {
        where: {
          userId: req.params.id,
        },
      }
    );
    console.log(`landlord`, landlord);
    res.json(landlord);
  } catch (error) {
    console.log(`put route error landlord`, error);
    next(error);
  }
});

router.delete("/:id", async (request, response, next) => {
  try {
    const landlord = await Landlord.destroy({
      where: { id: request.params.id },
    });
    response.json(landlord);
  } catch (error) {
    next(error);
  }
});
