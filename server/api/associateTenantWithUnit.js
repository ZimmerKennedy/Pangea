const express = require('express')
const router = express.Router()
const Unit = require('../db/models/Unit')
const Tenant = require('../db/models/Tenant')

router.post('/', async (req, res, next) => {
  try {
    console.log(`req.body`,req.body)
    const { unitId, tenantId } = req.body

    const unit = await Unit.findOne({
      where: { id: unitId }
    })

    const tenant = await Tenant.findByPk(tenantId)

    if (!unit || !tenant) {
      return res.status(400).send({ error: 'Invalid Unit or Tenant' })
    }

    unit.isOccupied = true
    await unit.save()

    tenant.unitIdToAssociateTenant = unit.id
    await tenant.save()

    return res.status(200).send({ message: 'Tenant associated with unit successfully' })
  } catch (error) {
    return next(error)
  }
})

module.exports = router