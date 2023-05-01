import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const getTenant = createAsyncThunk('tenant/getTenant', async (id) => {
    const tenant = await axios.get(`/api/tenant/${id}/landlordview`)
    return tenant.data
})

const singleTenantSlice = createSlice({
    name: "tenant",
    initialState: {},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTenant.fulfilled, (state, action) => {
            return {...state, ...action.payload}
        })
    }
})


export const selectTenant = (state) => {
    return state.tenant;
}

// export default getTenant
export default singleTenantSlice.reducer