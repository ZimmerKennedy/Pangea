"use strict";

const {
  db,
  models: { User, Landlord, Tenant, Property, MaintenanceRequest, Unit, Order },
} = require("../server/db");
const Payment = require("../server/db/models/Payment");
const PaymentHistory = require("../server/db/models/PaymentHistory");


console.log(`this is models`, User)
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  
  const newUser = await Promise.all([
    User.create({ username:"user1",password:"123",role:"tenant"}),
    User.create({ username:"user2",password:"123",role:"tenant"}),
    User.create({ username:"user3",password:"123",role:"tenant"}),
    User.create({ username:"landlord1",password:"123",role:"landlord"}),
    User.create({ username:"landlord2",password:"123",role:"landlord"}),
    User.create({ username:"landlord3",password:"123",role:"landlord"}),
  ]);
  
  const newTenant = await Promise.all([
    Tenant.create({name:"Donald", username:newUser[0].username, dateOfBirth:"1111-11-11", phoneNumber:"911", email:"someEmail@mail.com",rentPaid:false,leaseStartDate:"2023-02-07",leaseEndDate:"2024-02-07",userId:newUser[0].id}),
    Tenant.create({name:"Bob", username:newUser[1].username, dateOfBirth:"2222-22-22", phoneNumber:"911", email:"someEmail@mail.com",rentPaid:false,leaseStartDate:"2023-02-07",leaseEndDate:"2024-02-07",userId:newUser[1].id}),
    Tenant.create({name:"Builder", username:newUser[2].username, dateOfBirth:"3333-33-33", phoneNumber:"911", email:"someEmail@mail.com",rentPaid:false,leaseStartDate:"2023-02-07",leaseEndDate:"2024-02-07",userId:newUser[2].id}),
  ])
  
  const newLandlord = await Promise.all([
    Landlord.create({name:"Marven",username:newUser[3].username, phoneNumber:"911", email:"someEmail@mail.com", idForTenantToAssociate:"123", userId:newUser[3].id}),
    Landlord.create({name:"James",username:newUser[4].username, phoneNumber:"911", email:"someEmail@mail.com", idForTenantToAssociate:"1234", userId:newUser[4].id}),
    Landlord.create({name:"Doug", username:newUser[5].username,phoneNumber:"911", email:"someEmail@mail.com", idForTenantToAssociate:"12345", userId:newUser[5].id}),
  ])
  
  
  const newProperties = await Promise.all([
    Property.create({ propertyName:"North Haven", address:"5064 N Kimball Ave #4 Chicago, IL 60625", numberOfUnits:"5", LandlordId:newLandlord[0].id,}),
    Property.create({ propertyName:"West Haven", address:"5064 N Kimball Ave #4 Chicago, IL 60625", numberOfUnits:"5", LandlordId:newLandlord[1].id,}),
])


const units = await Promise.all([
  Unit.create({unitNumber:"1",isOccupied:false, bedrooms:"100"}),
  Unit.create({unitNumber:"2",isOccupied:true, bedrooms:"200"}),
  Unit.create({unitNumber:"3",isOccupied:false, bedrooms:"300"}),
])

const maintenanceRequests = await Promise.all([
  MaintenanceRequest.create({type:"Roofing", severity:"High",description:"Roof is missing somebody took my roof!!!"}),
  MaintenanceRequest.create({type:"Roofing", severity:"Medium",description:"Roof has a hole an asteroid fell"}),
  MaintenanceRequest.create({type:"Roofing", severity:"Low",description:"I have no Roof"}),
])
const payments = await Promise.all([
  Payment.create({tenantId:newTenant[0].id,paidAmount:500, paymentDate:Date.now(),paymentBy:newTenant[0].name}),
  Payment.create({tenantId:newTenant[1].id,paidAmount:600, paymentDate:Date.now(),paymentBy:newTenant[1].name}),
  Payment.create({tenantId:newTenant[2].id,paidAmount:700, paymentDate:Date.now(),paymentBy:newTenant[2].name}),
])
const paymentHistories = await Promise.all([
  PaymentHistory.create({paidAmount:500, paymentDate:Date.now(), paymentBy:newTenant[0].name, tenantId:newTenant[0].id, paymentId:payments[0].id, unitNumber:0}),
  PaymentHistory.create({paidAmount:600, paymentDate:Date.now(), paymentBy:newTenant[1].name, tenantId:newTenant[1].id, paymentId:payments[1].id, unitNumber:1}),
  PaymentHistory.create({paidAmount:700, paymentDate:Date.now(), paymentBy:newTenant[2].name, tenantId:newTenant[2].id, paymentId:payments[2].id, unitNumber:2}),
])
}

/*
We've separated the `seed` function from the `runSeed` function.
This way we can isolate the error handling and exit trapping.
The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}
/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
