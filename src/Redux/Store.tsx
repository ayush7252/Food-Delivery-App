import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/CartSlice';
import addressReducer from './Slices/AddressSlice'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    address: addressReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;