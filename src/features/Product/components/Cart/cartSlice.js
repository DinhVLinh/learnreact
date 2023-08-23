import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "cart",
  initialState: {
    showMiniCart: false,
    cartItems: [],
  },
  reducers: {
    showMiniCart(state) {
      state.showMiniCart = true;
    },

    hideMiniCart(state) {
      state.showMiniCart = true;
    },

    addToCart(state, action) {
      const newItem = action.payload;

      const index = state.cartItems.findIndex((x) => x.id === newItem.id);
      if (index >= 0) {
        state.cartItems[index].quantity += newItem.quantity;
      } else {
        state.cartItems.push(newItem);
      }
    },

    removeCartItem(state, action) {
      const idNeedRemove = action.payload;
      state.cartItems.filter((x) => x.id !== idNeedRemove);
    },
  },
});

const { actions, reducer } = counterSlice;

export const {
  showMiniCart,
  hideMiniCart,
  setQuantityCart,
  addToCart,
  removeCartItem,
} = actions;
export default reducer;
