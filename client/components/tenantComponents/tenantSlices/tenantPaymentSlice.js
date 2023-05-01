import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";


export const submitPayment =
  (tenantId, paymentDate, paidAmount, paymentBy, unitNumber) => async (dispatch) => {
    dispatch(submitPaymentStart());
    try {
      const response = await axios.post("/api/payment", {
        tenantId,
        paymentDate,
        paidAmount,
        paymentBy,
        unitNumber,
      });
      dispatch(submitPaymentSuccess(response.data));
    } catch (error) {
      dispatch(submitPaymentFailure(error.message));
    }
  };

const initialState = {
  payment: {},
};

const paymentsSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    submitPaymentStart: (state) => {
      state.paymentLoading = true;
      state.paymentError = null;
    },
    submitPaymentSuccess: (state, action) => {
      state.payment = action.payload;
      state.paymentLoading = false;
      state.paymentError = null;
    },
    submitPaymentFailure: (state, action) => {
      state.paymentLoading = false;
      state.paymentError = action.payload;
    },
  },
});

export const {
  submitPaymentStart,
  submitPaymentSuccess,
  submitPaymentFailure,
} = paymentsSlice.actions;
export default paymentsSlice.reducer;

