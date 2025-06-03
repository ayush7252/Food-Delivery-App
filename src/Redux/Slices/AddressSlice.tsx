import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AddressState = {
  addresses: Address[];
};

const initialState: AddressState = {
  addresses: [],
};

type Address = {
    name: string;
    phone: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
}

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
  },
});

export const { addAddress } = addressSlice.actions;
export default addressSlice.reducer;