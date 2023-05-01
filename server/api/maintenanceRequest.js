const router = require('express').Router()
const { models: { MaintenanceRequest, Unit }} = require('../db')
// All Work Order Route
router.get('/', async (req, res, next) => {
    try {
        const maintenaceRequests = await MaintenanceRequest.findAll({
            include: {model: Unit,
            attributes: ['id']
            }
        })
        res.json(maintenaceRequests);
    } catch (err) {
        console.log(`error in maintenance req`,err)
        next(err)
        
    }
})
// Single Work Order Route
router.get('/:id', async(req,res,next) =>{
    try{
        const maintenanceRequest = await MaintenanceRequest.findByPk(req.params.id);
        res.send(maintenanceRequest);
    } catch(err){
        console.log(`error in single maintenance route`, err)
        next(err)
    }
})

// Create Work Order Route
router.post('/', async (req, res, next) => {
    try {
        const now = new Date();
        console.log(`req.body`,req.body)
      const newMaintenanceRequest = await MaintenanceRequest.create({
        type: req.body.type,
        severity: req.body.severity,
        description: req.body.description,
        creationDate: now.toLocaleDateString(),
        // imageUrl: req.body.imageUrl,
        // unitId: req.body.unitId
      });
  
      const unit = await Unit.findByPk(req.body.unitId);
      unit.addMaintenanceRequest(newMaintenanceRequest);
  
      res.json(newMaintenanceRequest);
    } catch (error) {
      next(error);
    }
  });

// Update Work Order Route
router.put('/:maintenanceRequestId', async(req,res,next) =>{
    try{
        const maintenanceRequest = await MaintenanceRequest.update(req.body, {where: {id: req.params.maintenanceRequestId}})
        res.json(maintenanceRequest)
    } catch(err){
        console.log(`error in update maintenance route`, err)
        next(err)
    }
})

// Delete Work Order Route
router.delete('/:id', async(req,res,next) =>{
    try{
        const maintenanceRequest = await MaintenanceRequest.destroy({where: {id: req.params.id}})
        res.json(maintenanceRequest)
    } catch(err){
        console.log(`error in delete maintenance route`, err)
        next(err)
    }
})



module.exports = router