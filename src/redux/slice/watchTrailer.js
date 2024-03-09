import { createSlice } from "@reduxjs/toolkit";


const trailerSlice = createSlice({
    name : "trailer",
    initialState: {
        open: false,
    },
    reducers:{
        setOpen: (state, action) => {
            state.open = action.payload;
        }
    }
})

export const {setOpen} = trailerSlice.actions;

export default trailerSlice;