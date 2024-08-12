import {configureStore} from "@reduxjs/toolkit"

import userReducer from '../slices/userSlice';
import booksReducer from '../slices/booksSlice';
export const store = configureStore({
    reducer:{
        user: userReducer,
        books: booksReducer,
    },
})