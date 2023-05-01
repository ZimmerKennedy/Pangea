import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


export const fetchSingleMaintenanceRequestAsync =  createAsyncThunk('singleMaintenanceRequest', async (id) =>{
    try{
        const { data } = await axios.get(`http://localhost:8080/api/maintenanceRequest/${id}`);
        console.log(`data from workOrders`, data)
        return data
    } catch (err){
        console.log(`error in singleWorkOrderThunk`,err)
    }
})

export const maintenanceRequestSlice = createSlice({
    name: 'maintenanceRequest',
    initialState:{},
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchSingleMaintenanceRequestAsync.fulfilled,(state,action) =>{
            return action.payload
        })
    }
})

export const selectMaintenanceRequest = (state) =>{
    return state.maintenanceRequest;
}

export default maintenanceRequestSlice.reducer