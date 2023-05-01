const router = require("express").Router();
module.exports = router;

const {
  models: { Tenant, Unit, MaintenanceRequest, Landlord, PaymentHistory },
} = require("../db");

const Sequelize = require("sequelize")

// All tenants
router.get("/", async (req, res, next) => {
  try {
    const tenants = await Tenant.findAll();
    res.json(tenants);
  } catch (err) {
    next(err);
    console.log(`Error on Tenant`);
    next(err);
  }
});

// single tenant route 

router.get("/:id", async (request, response, next) => {
  try {
    const tenant = await Tenant.findOne({
      where: { userId: request.params.id },
    });
    response.json(tenant);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/landlordview', async (request, response, next) => {
  try {
  const tenant = await Tenant.findOne({ 
      where: { id: request.params.id }, 
      include: {
          model: Unit,
// number of work orders 
          attributes: {
              include: [
                  [Sequelize.fn('COUNT', Sequelize.col('unit.maintenanceRequests.id')), 'workOrders']
              ]
          },
          include: {
              model: MaintenanceRequest,
              attributes: []
          }
      },
      group: ['tenant.id', 'unit.id']
  })

  response.send(tenant)
  } catch(error){
  next(error)
  }
  });

router.post("/", async (req, res, next) => {
  console.log(`im request.body`, req.body);
  try {
    const tenant = await Tenant.create(req.body);
    res.json(tenant);
  } catch (error) {
    console.log(`Error tenantPostRoute`, error);
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const now = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(now.getMonth() + 1);
    const idForTenantToAssociate = req.body.idForTenantToAssociate;

    let landlordId = null;
    if (idForTenantToAssociate) {
      const landlord = await Landlord.findOne({
        where: {
          idForTenantToAssociate: idForTenantToAssociate
        }
      });
      if (!landlord) {
        return res.status(400).send({
          message: `Landlord with idForTenantToAssociate=${idForTenantToAssociate} not found`
        });
      }
      landlordId = landlord.id;
    }

    const tenant = await Tenant.update(
      {
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        landlordId: landlordId,
        leaseStartDate: now.toLocaleDateString(),
        leaseEndDate: nextMonth.toLocaleDateString(),
        idForTenantToAssociate: landlordId,
      },
      {
        where: {
          userId: req.params.id,
        }
      }
    );
    res.json(tenant);
  } catch (error) {
    console.log(`Error tenantPutRoute`, error);
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const tenant = await Tenant.destroy({ where: { id: req.params.id } });
    res.json(tenant);
  } catch (error) {
    console.log(`Error tenantDeleteRoute`, error);
    next(error);
  }
});

module.exports = router;

