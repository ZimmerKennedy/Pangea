import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// this gets all the properties for the landlord from the database and stores them in the store
export const fetchPropertiesAsync = createAsyncThunk('properties', async() =>{
  try{
    const { data } = await axios.get(`http://localhost:8080/api/property`);
    console.log(`i am data from thunk`, data)
    return data
  } catch (err){
    console.log(`error in Properties Thunk`,err)
  }
});

export const deletePropertyAsync = createAsyncThunk("deleteProperty", async(propertyId) => {
  try{
    const {data} = await axios.delete(`http://localhost:8080/api/property/${propertyId}`)
  } catch(err) {
    console.log(`Error in deletePropertyAsync`,err)
  }
})
const propertiesSlice = createSlice({
    name: 'properties',
    initialState: [],
    reducers: {},
    extraReducers:(builder) => {
      builder.addCase(fetchPropertiesAsync.fulfilled, (state, action) => {
        console.log(`action.payload`, action.payload)
        return action.payload;
      });
      builder.addCase(deletePropertyAsync.fulfilled,(state,action) =>{
        alert('Property Delete Success');
        return action.payload;
      })
    },
  });

// this gets the properties from the store
export const selectProperties = (state) => {
    return state.property;
  };

export default propertiesSlice.reducer