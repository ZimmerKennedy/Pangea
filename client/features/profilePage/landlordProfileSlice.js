import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    landlord:[],
};

export const fetchlandlordAsync = createAsyncThunk('landlord', async(id) =>{
    try{
      const { data } = await axios.get(`http://localhost:8080/api/landlords/${id}`);
      console.log(`data`,data)
      return data
    } catch (err){
      console.log(`error in landlord Thunk`,err)
    }
  });

  export const landlordSlice = createSlice({
    name: 'landlord',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchlandlordAsync.fulfilled,(state,action) =>{
            console.log(`action`, action)
            return action.payload;
        })
    }
})

export const selectLandlord = (state) =>{
    return state.landlord;
}

export default landlordSlice.reducer