import { createSlice } from '@reduxjs/toolkit';

const booksSlice = createSlice({
  name: 'books',
  initialState: [],
  reducers: {
    setBooks: (state, action) => action.payload,
  addBook: (state, action) => {
  state.push(action.payload);
},
updateBook: (state, action) => {
  const index = state.findIndex((book) => book.id === action.payload.id);
  if (index !== -1) {
    state[index] = action.payload; // Update the existing book in the state
  }
},
deleteBook: (state, action) => {
  return state.filter((book) => book.id !== action.payload);
},
  },
});

export const { setBooks, addBook, updateBook, deleteBook } = booksSlice.actions;
export default booksSlice.reducer;





























// addBook: (state, action) => {
//   state.push(action.payload);
// },
// updateBook: (state, action) => {
//   const index = state.findIndex((book) => book.id === action.payload.id);
//   if (index !== -1) {
//     state[index] = action.payload; // Update the existing book in the state
//   }
// },
// deleteBook: (state, action) => {
//   return state.filter((book) => book.id !== action.payload);
// },
//export const { setBooks, addBook, updateBook, deleteBook } = booksSlice.actions;