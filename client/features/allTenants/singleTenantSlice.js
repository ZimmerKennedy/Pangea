import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTenantAsync = createAsyncThunk('tenant', async(id) =>{
    try{
        const { data } = await axios.get(`http://localhost:8080/api/tenant/${id}`);
        console.log("DATA" + data)
        return data
    } catch (err){
        console.log(`error in tenantThunk`,err)
    }
})


const singleTenantSlice = createSlice({
    name: 'tenant',
    initialState: {},
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchTenantAsync.fulfilled, (state,action) =>{
            return action.payload;
        });
    },
});


export const selectTenant = (state) => {
    return state.tenant;
}

export default singleTenantSlice.reducer;