const router = require("express").Router();
const Tenant = require("../db/models/Tenant");
const User = require('../db/models/User')

router.route('/')
.get(async (req, res, next) => {
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (err) {
    next(err);
  }
})
.post(async (req,res,next) => {
  const user = await User.findByToken(req.headers.authorization);
  try{
    if(user.role === 'tenant' || 'landlord'){
      console.log(`hi im req.body`,req.body)
      const { rentAmount } = req.body;
      //validation
      if( !rentAmount){
        res.status(400);
        throw new Error('Please include a Rent Amount');
      }
      //Create Tenant
      // const tenant = await Tenant.create({rentAmount})
      const tenant = await Tenant.update({rentAmount : rentAmount}, {where:{id: req.body.tenantId}});
      if(tenant){
        res.status(201).json({
          // price: Tenant.rentAmount,
          rentAmount: req.body.rentAmount
        })
      }
    } else{
      res.status(401)
      throw new Error('Not authorized');
    }
  } catch(err){
    next(err);
  }
});




router.route('/:TenantId')
.get(async (req, res, next) => {
  try {
    const tenant = await Tenant.findByPk(req.params.TenantId);
    res.json(tenant);
  } catch (err) {
    next(err);
  }
})
.put(async (req,res,next) => {
  const user = await User.findByToken(req.headers.authorization);
  if(user.isAdmin){
    try{
      const tenant = await Tenant.findByPk(req.params.TenantId);

      if(!tenant){
        res.status(404);
        throw new Error('Tenant not found');
      }else{
        const updatedTenant = await Tenant.update(req.body);
        res.status(202).send(updatedTenant);
      }
    } catch(err){
      next(err);
    }
  } else{
    res.status(401);
    throw new Error('Not authorized')
  }
})
.delete(async(req,res,next) => {
  const user = await User.findByToken(req.headers.authorization);
  if(user.isAdmin){
    try{
      const tenant = await Tenant.findByPk(req.params.TenantId);
      if(!tenant){
        res.status(404);
        throw new Error('Tenant not found');
      }else{
        await Tenant.destroy();
        res.status(200).send('Terminated'); 


      }
    } catch(err){
      next(err);
    }
  } else{
    res.status(401);
    throw new Error('Not authorized');
  }
})


module.exports = router;
