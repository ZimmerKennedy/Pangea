import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRentAsync = createAsyncThunk("getRent", async (id) => {
	try {
		const { data } = await axios.get(`/api/rents/${id}`);
		return data;
	} catch (error) {
		console.error(error);
	}
});

const singleRentSlice = createSlice({
	name: "singlerent",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRentAsync.fulfilled, (state, action) => {
			return action.payload;
		});
	},
});

export const selectSingleRent = (state) => {
	return state.singleRent;
};
export default singleRentSlice.reducer;
