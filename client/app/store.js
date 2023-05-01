import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../auth/authSlice';
import maintenanceRequestsReducer from '../components/landlordComponents/landlordSlices/allMaintenanceRequestSlice';
import tenantsReducer from '../components/landlordComponents/landlordSlices/allTenantsSlice';
import unitsReducer from '../components/landlordComponents/landlordSlices/unitsSlice';
import propertiesReducer from '../components/landlordComponents/landlordSlices/propertySlice'
import rentsReducer from "../components/landlordComponents/landlordSlices/rentSlice";
import singleRentSlice from "../components/landlordComponents/landlordSlices/singleRentSlice";
// import usersReducer from "../features/users/usersSlice";
import landlordReducer from '../components/landlordComponents/landlordSlices/landlordProfileSlice';
import singleTenantReducer from "../components/landlordComponents/landlordSlices/singleTenantSlice";
import maintenanceRequestReducer from "../components/landlordComponents/landlordSlices/singleMaintenanceRequestSlice";
import paymentHistoryReducer from "../components/landlordComponents/landlordSlices/paymentsSlice"

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
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../auth/authSlice';
export * from '../components/landlordComponents/landlordSlices/AddAPropertySlice';
