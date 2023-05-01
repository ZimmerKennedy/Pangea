import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMaintenanceRequestsAsync = createAsyncThunk('allMaintenanceRequest', async() =>{ 
    try{
        const { data } = await axios.get(`http://localhost:8080/api/maintenanceRequest`);
        return data;
    } catch (err){
        console.log(`error in workOrderThunk`,err)
    }
})

export const deleteMaintenanceRequestAsync = createAsyncThunk('deleteMaintenanceRequest', async(id) =>{
    try{
        await axios.delete(`http://localhost:8080/api/maintenanceRequest/${id}`);
    } catch (err){
        console.log(`error in deleteMaintenanceRequest Thunk`, err)
    }
})
const maintenaceRequestsSlice = createSlice({
    name: 'maintenanceRequests',
    initialState: [],
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchMaintenanceRequestsAsync.fulfilled, (state,action) =>{
            return action.payload;
        });
        builder.addCase(deleteMaintenanceRequestAsync.fulfilled, (state,action) =>{
            alert(`Work Order Delete Success`)
            return action.payload;
        });
    },
});

export const selectMaintenanceRequests = (state) => {
    return state.maintenanceRequests;
}

export default maintenaceRequestsSlice.reducer