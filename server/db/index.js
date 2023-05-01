//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Tenant = require('./models/Tenant')
const Property = require('./models/Property')
const Unit = require('./models/Unit')
const Landlord = require('./models/Landlord')
const MaintenanceRequest = require('./models/MaintenanceRequest')
const Admin = require('./models/Admin')
const Payment = require('./models/Payment')
const PaymentHistory = require('./models/PaymentHistory')
//associations could go here!

Landlord.hasMany(Property, { foreignKey: 'landlordId'});
Property.belongsTo(Landlord, { foreignKey: 'landlordId'});

Property.hasMany(Unit, { foreignKey: 'propertyId'});
Unit.belongsTo(Property, { foreignKey: 'propertyId'});


Landlord.hasMany(Property, { foreignKey: 'landlordId',});
Property.belongsTo(Landlord, { foreignKey: 'landlordId',});

Property.hasMany(Unit, { foreignKey: 'propertyId',});
Unit.belongsTo(Property, { foreignKey: 'propertyId',});

Unit.hasOne(Tenant, {foreignKey: 'unitIdToAssociateTenant'})
Tenant.belongsTo(Unit, {foreignKey: 'unitIdToAssociateTenant'})

Unit.hasMany(MaintenanceRequest);
MaintenanceRequest.belongsTo(Unit, {
  foreignKey: 'unitId',
  onDelete: 'cascade'
})


User.hasOne(Tenant, { foreignKey: 'userId', onDelete: 'cascade' });
Tenant.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });


User.hasOne(Landlord, { foreignKey: 'userId', onDelete: 'cascade' });
Landlord.belongsTo(User, { foreignKey: 'userId', onDelete: 'cascade' });

Landlord.hasMany(Tenant, { foreignKey: 'idForTenantToAssociate', targetKey: 'id'});
Tenant.belongsTo(Landlord, { foreignKey: 'idForTenantToAssociate', sourceKey: 'id'});

Tenant.hasMany(Payment, { foreignKey: 'tenantId', as: 'payments' });
Payment.belongsTo(Tenant, { foreignKey: 'tenantId' });
Payment.hasMany(PaymentHistory, { foreignKey: 'paymentId', as: 'paymentHistory' });
PaymentHistory.belongsTo(Payment, { foreignKey: 'paymentId' });

module.exports = {
  db,
  models: {
    User,
    Tenant,
    Property,
    Unit,
    Landlord,
    MaintenanceRequest,
    Admin,
    Payment,
    PaymentHistory,
  },
}
