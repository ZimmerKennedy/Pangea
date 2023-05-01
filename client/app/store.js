import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/auth/authSlice';
import maintenanceRequestsReducer from '../features/maintenanceRequest/allMaintenanceRequestSlice';
import tenantsReducer from '../features/allTenants/allTenantsSlice';
import unitsReducer from '../features/units/unitsSlice';
import singleTenantSlice from '../components/SingleTenant/singleTenantSlice' 
import propertiesReducer from '../features/property/propertySlice'
import rentsReducer from "../features/rent/rentSlice";
import singleRentSlice from "../features/rent/singleRentSlice";
// import usersReducer from "../features/users/usersSlice";
import landlordReducer from '../features/profilePage/landlordProfileSlice';
import singleTenantReducer from "../features/allTenants/singleTenantSlice";
import maintenanceRequestReducer from "../features/maintenanceRequest/singleMaintenanceRequestSlice";
import paymentHistoryReducer from "../features/paymentsLandlord/paymentsSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    maintenanceRequests: maintenanceRequestsReducer,
    maintenanceRequest: maintenanceRequestReducer,
    tenants: tenantsReducer,
    units: unitsReducer,
    tenant: singleTenantReducer,
    property: propertiesReducer,
    
    rents: rentsReducer,
    singleRent: singleRentSlice,
    landlord: landlordReducer,
    paymentHistory: paymentHistoryReducer,
    // Unusable Code Fix!!!
    // users: usersReducer,
    landlordTenant: singleTenantSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../features/auth/authSlice';
export * from '../features/afterSignup/AddAPropertySlice';
