import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createUnit = createAsyncThunk(
  'units/createUnit',
  async (unitData) => {
    try {
      const response = await axios.put('/api/unit/:id', unitData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


const unitsSlice = createSlice({
  name: 'units',
  initialState: {
    units: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: {
    [createUnit.pending]: (state) => {
      state.loading = true;
    },
    [createUnit.fulfilled]: (state, action) => {
      state.loading = false;
      state.units.push(action.payload);
    },
    [createUnit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export default unitsSlice.reducer;

