import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existingItem = state.items.find(
        (item) =>
          item.productId === newItem.productId &&
          item.color === newItem.color &&
          item.size === newItem.size
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.cartItemId !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.cartItemId === cartItemId
      );

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;