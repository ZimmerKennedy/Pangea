import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const associateTenantWithUnit = createAsyncThunk(
  'tenant/associateTenantWithUnit',
  async ({ unitId, tenantId }) => {
    console.log(`unitId`,unitId)
    const response = await axios.post(
      `/api/associateTenantWithUnit`,
      {
        unitId,
        tenantId,
      }
    );

    return response.data;
  }
);

const addTenantToUnitSlice = createSlice({
  name: 'tenant',
  initialState: {
    loading: false,
    error: null
  },
  reducers: {
    associateTenantWithUnitSuccess(state, action) {
      state.loading = false;
    },
    associateTenantWithUnitFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  },
  extraReducers: {
    [associateTenantWithUnit.pending]: (state, action) => {
      state.loading = true;
    },
    [associateTenantWithUnit.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [associateTenantWithUnit.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    }
  }
});

export const { associateTenantWithUnitSuccess, associateTenantWithUnitFailed } = addTenantToUnitSlice.actions;
export default addTenantToUnitSlice.reducer;