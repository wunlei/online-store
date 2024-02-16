import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addItemToCart, updateCartItemCount } from "../slices/appSlice";
import { RootState } from "../store";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(addItemToCart, updateCartItemCount),
  effect: async (action, listenerApi) => {
    // listenerApi.cancelActiveListeners();

    const state = listenerApi.getState() as RootState;

    localStorage.setItem("cart", JSON.stringify(state.app.cart));
  },
});
