import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPaymentHistory = createAsyncThunk(
  "paymentHistory/fetchPaymentHistory",
  async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/paymentHistory");
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

const paymentHistorySlice = createSlice({
  name: "paymentHistory",
  initialState: {
    paymentHistory: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>{
    builder.addCase(fetchPaymentHistory.fulfilled, (state,action) =>{
        return action.payload;
    });
  },
});

export const selectPaymentHistory = (state) =>{
    return state.paymentHistory;
}

export default paymentHistorySlice.reducer;
