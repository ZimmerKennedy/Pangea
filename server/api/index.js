const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/tenant', require('./tenant'))
router.use('/property', require('./property'))
router.use('/unit', require('./unit'))
router.use('/landlords', require('./landlords'))
router.use('/maintenanceRequest', require('./maintenanceRequest'))
router.use('/rents', require('./rents'))

router.use('/payment', require('./payment'))
router.use('/paymentHistory', require('./paymentHistory'))

router.use('/associateTenantWithUnit', require('./associateTenantWithUnit'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
