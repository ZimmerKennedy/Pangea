import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPropertiesAsync = createAsyncThunk('properties', async() =>{
  try{
    const { data } = await axios.get(`https://rentility.onrender.com/api/property`);
    return data
  } catch (err){
    console.error(`error in Properties Thunk`,err)
  }
});

export const deletePropertyAsync = createAsyncThunk("deleteProperty", async(propertyId) => {
  try{
    const {data} = await axios.delete(`https://rentility.onrender.com/api/property/${propertyId}`)
    return data
  } catch(err) {
    console.error(`Error in deletePropertyAsync`,err)
  }
})
const propertiesSlice = createSlice({
    name: 'properties',
    initialState: [],
    reducers: {},
    extraReducers:(builder) => {
      builder.addCase(fetchPropertiesAsync.fulfilled, (state, action) => {
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