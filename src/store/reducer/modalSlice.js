import { createSlice } from "@reduxjs/toolkit";

const name = "modal";

const initialState = [];
export const modalSelector = (state) => state.modal;

const modalSlice = createSlice({
  name,
  initialState,
  reducers: {
    openModal: (state, action) => {
      const {
        type,
        props,
      } = action.payload;
      return state.concat({
        type,
        props,
      });
    },
    closeModal: (state) => {
      state.pop();
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
