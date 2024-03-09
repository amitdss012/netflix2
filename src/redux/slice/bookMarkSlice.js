import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookMarks: JSON.parse(localStorage.getItem('bookMarks')) || [],
};

export const bookMarkSlice = createSlice({
  name: 'bookMark',
  initialState,
  reducers: {
    addToBookMark: (state, action) => {
        const newItem = action.payload;
        if (!state.bookMarks.find(item => item.id === newItem.id)) {
          state.bookMarks = [...state.bookMarks, newItem]; // Create a new array with the new item added
          localStorage.setItem('bookMarks', JSON.stringify(state.bookMarks));
        } else {
          alert("This movie is already bookmarked");
        }
      },
    removeFromBookMark: (state, action) => {
      const itemIdToRemove = action.payload;
      state.bookMarks = state.bookMarks.filter(item => item.id !== itemIdToRemove); // Create a new array without the removed item
      localStorage.setItem('bookMarks', JSON.stringify(state.bookMarks));
    },
  },
});

export const { addToBookMark, removeFromBookMark } = bookMarkSlice.actions;

export default bookMarkSlice.reducer;
