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
			console.log(`data`,rentData)
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
	reducers: {
		sortByCategory(state, action) {
			return state.filter((rent) => {
				if (rent.category === action.payload) {
					return true;
				}
			});
		},
		sortBySearch(state, action) {
			console.log(action.payload);
			const filtered = state.filter(({ name }) => {
				if (name.toLowerCase().includes(action.payload)) {
					return true;
				}
			});
			return filtered;
			// console.log(filtered);
		},
		sortAZ(state, action) {
			return state.sort((a, b) =>
				a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
			);
		},

		sortZA(state, action) {
			return state.sort((a, b) =>
				a.name.toLowerCase() < b.name.toLowerCase() ? 1 : -1
			);
		},
		sortPriceAsc(state, action) {
			return state.sort((a, b) =>
				a.price - b.price
			);
		},
		sortPriceDesc(state, action) {
			return state.sort((a, b) =>
			b.price - a.price
			);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRentsAsync.fulfilled, (_state, action) => {
			return action.payload;
		});
		builder.addCase(addRentAsync.fulfilled),
			(state, action) => {
				return state;
			};
		builder.addCase(deleteRentAsync.fulfilled),
			(_state, action) => {
				return action.payload;
			};
	},
});

export const { sortByCategory, sortBySearch,sortAZ,sortZA,sortPriceAsc,sortPriceDesc } = rentsSlice.actions;

export const selectRents = (state) => {
	return state.rents;
};
export default rentsSlice.reducer;
