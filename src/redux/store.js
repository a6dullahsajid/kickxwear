import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem("cart");

    if (!savedCart) {
      return undefined;
    }

    return {
      cart: JSON.parse(savedCart),
    };
  } catch (error) {
    console.error("Failed to load cart:", error);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState:
    typeof window !== "undefined" ? loadCart() : undefined,
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    try {
      const state = store.getState();

      localStorage.setItem(
        "cart",
        JSON.stringify(state.cart)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  });
}