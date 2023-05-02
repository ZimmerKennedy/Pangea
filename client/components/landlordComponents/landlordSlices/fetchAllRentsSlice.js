import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRentsAsync = createAsyncThunk("getRent", async () => {
	try {
		const { data } = await axios.get("/api/rents");
		return data;
	} catch (error) {
		console.error(error);
	}
});

//Create rent
export const addRentAsync = createAsyncThunk(
	"addRent",
	async (rentData) => {
		try {
			const token = window.localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: token,
				},
			};
			const { data } = await axios.post("/api/rents", rentData, config);
			alert("This rent is now added to inventory");
			return data;
		} catch (error) {
			//Displays alert popup to user
			alert(error.response.data);
		}
	}
);

//Delete rent
export const deleteRentAsync = createAsyncThunk(
	"deleteRent",
	async (rentId) => {
		try {
			const token = window.localStorage.getItem("token");
			const config = {
				headers: {
					Authorization: token,
				},
			};
			const { data } = await axios.delete(`/api/rents/${rentId}`, config);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	}
);

const rentsSlice = createSlice({
	name: "rents",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchRentsAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
		builder.addCase(addRentAsync.fulfilled, (state, action) => {
			return state;
		});
		builder.addCase(deleteRentAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
	},
});


export const selectRents = (state) => {
	return state.rents;
};
export default rentsSlice.reducer;
