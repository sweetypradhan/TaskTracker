import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

/* This code is creating a Redux store using the `configureStore` function from the
`@reduxjs/toolkit` library. The store is configured with a reducer for managing tasks, which is
provided by the `taskReducer` imported from the `taskSlice` file. The store is then exported as a
constant named `store`, making it accessible for use in other parts of the application. */

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
