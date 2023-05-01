import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createMaintenanceRequest = createAsyncThunk(
  'maintenanceRequest/create',
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/maintenanceRequest', requestData);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

const maintenanceRequestSlice = createSlice({
  name: 'maintenanceRequest',
  initialState: {
    loading: false,
    error: null,
    maintenanceRequests: []
  },
  reducers: {
    resetError: state => {
      state.error = null;
    }
  },
  extraReducers: {
    [createMaintenanceRequest.pending]: state => {
      state.loading = true;
    },
    [createMaintenanceRequest.fulfilled]: (state, action) => {
      state.loading = false;
      state.maintenanceRequests.push(action.payload);
    },
    [createMaintenanceRequest.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { resetError } = maintenanceRequestSlice.actions;

export default maintenanceRequestSlice.reducer;