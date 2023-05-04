import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    landlord:[],
};

export const fetchlandlordAsync = createAsyncThunk('landlord', async(id) =>{
    try{
      const { data } = await axios.get(`https://rentility.onrender.com/api/landlords/${id}`);

      return data
    } catch (err){
      console.error(`error in landlord Thunk`,err)
    }
  });

  export const landlordSlice = createSlice({
    name: 'landlord',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(fetchlandlordAsync.fulfilled,(state,action) =>{
            return action.payload;
        })
    }
})

export const selectLandlord = (state) =>{
    return state.landlord;
}

export default landlordSlice.reducer