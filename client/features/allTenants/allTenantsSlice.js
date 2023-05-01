import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTenantsAsync = createAsyncThunk('tenants', async() =>{
    try{
        const { data } = await axios.get(`http://localhost:8080/api/tenant`);
        return data
    } catch (err){
        console.log(`error in tenantsThunk`, err)
    }
})

export const deleteTenantAsync = createAsyncThunk(
    "tenants/deleteTenant",
    async (tenantId) => {
      try {
        const { data } = await axios.delete(`http://localhost:8080/api/tenant/${tenantId}`);
        return data;
      } catch (err) {
        console.log(`Error in deleteTenantAsync`, err);
      }
    }
  );
  
  

const tenantsSlice = createSlice({
    name: 'tenants',
    initialState: [],
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchTenantsAsync.fulfilled, (state,action) =>{
            return action.payload;
        });
        builder.addCase(deleteTenantAsync.fulfilled, (state, action) => {
            alert('Tenant Delete Success');
            return action.payload;
          });
    },
});

export const selectTenants = (state) => {
    return state.tenants;
}

export default tenantsSlice.reducer;