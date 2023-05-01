const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;
const Landlord = require("../db/models/Landlord");
const Tenant = require("../db/models/Tenant");

// router.get('/signup', async (req, res, next) => {
//   try {
//     res.send(await User.findAll());
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/login", async (req, res, next) => {
	try {
		const token = await User.authenticate(req.body);
		const user = await User.findByToken(token);
		res.send({ token: token });
		if (req.body.cart.length !== 0)
			return await user.update({ cart: req.body.cart });
	} catch (err) {
		next(err);
	}
});

router.post("/signup", async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.create({
      username,
      password,
      role,
    });
    if (role === "tenant") {
      const tenant = await Tenant.create({
        userId: user.id,
        username: username,
        role: role,
      });
       await user.setTenant(tenant);
    } else if (role === 'landlord') {
      const landlord = await Landlord.create({
        userId: user.id,
        username: username,
        role: role,
      });
      await user.setLandlord(landlord);
    }
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.get("/me", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
