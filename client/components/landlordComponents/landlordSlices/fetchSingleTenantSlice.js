import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTenantAsync = createAsyncThunk('tenant', async(id) =>{
    try{
        const { data } = await axios.get(`https://rentility.onrender.com/tenant/${id}`);

        return data
    } catch (err){
        console.error(`error in tenantThunk`,err)
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