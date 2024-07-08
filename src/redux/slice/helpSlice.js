import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFull : false
}

export const helpSlice = createSlice({
    name:"help",
    initialState,
    reducers: {
        upadateFull: (state, action) => {
            state.isFull = action.payload
        }
    }
})