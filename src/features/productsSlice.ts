import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    items: [],
    status: null,
}

export const productsFetch: any = createAsyncThunk(
    "products/productsFetch",
    async () => {
        const response = await axios.get("https://fakestoreapi.com/products")
        return response?.data
    }
)

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: {
        [productsFetch.pending]: (state: any, action: any) => {
            state.status = "pending"
        },
        [productsFetch.fulfilled]: (state: any, action: any) => {
            state.status = "success"
            state.items = action.payload
        },
        [productsFetch.rejected]: (state: any, action: any) => {
            state.status = "rejected"
        }
    }
})

export default productsSlice.reducer