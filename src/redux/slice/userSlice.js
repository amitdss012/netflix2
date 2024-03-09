import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "userStill",
    initialState: {
        user: null,
        isLoading: false,
    },
    reducers: {
        setUser: (state , action) => {
            state.user = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
    }
})

export const {setUser, setLoading, setBookMark} = userSlice.actions

export default userSlice.reducer