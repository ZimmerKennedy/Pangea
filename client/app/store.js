import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../auth/authSlice';
import maintenanceRequestsReducer from '../components/landlordComponents/landlordSlices/fetchAllMaintenanceRequestsSlice';
import tenantsReducer from '../components/landlordComponents/landlordSlices/fetchAllTenantsSlice';
import unitsReducer from '../components/landlordComponents/landlordSlices/fetchAllUnitsSlice';
import propertiesReducer from '../components/landlordComponents/landlordSlices/fetchAllPropertiesSlice'
import rentsReducer from "../components/landlordComponents/landlordSlices/fetchAllRentsSlice";
import singleRentSlice from "../components/landlordComponents/landlordSlices/fetchSingleRentSlice";
// import usersReducer from "../features/users/usersSlice";
import landlordReducer from '../components/landlordComponents/landlordSlices/fetchLandlordSlice';
import singleTenantReducer from "../components/landlordComponents/landlordSlices/fetchSingleTenantSlice";
import maintenanceRequestReducer from "../components/landlordComponents/landlordSlices/fetchSingleMaintenanceRequestSlice";
import paymentHistoryReducer from "../components/landlordComponents/landlordSlices/fetchAllPaymentsSlice"

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
export * from '../components/landlordComponents/landlordSlices/createProperty';
