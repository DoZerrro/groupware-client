import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "@reducer/modalSlice";
import roleGroupSlice from "@reducer/roleGroupSlice";
import applicationSlice from "@reducer/applicationSlice";

export const store = configureStore({
  reducer: {
    application: applicationSlice,
    modal: modalSlice,
    roleGroup: roleGroupSlice,
  },
});
