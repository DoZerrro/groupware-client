import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
};

const roleGroupSlice = createSlice({
  name: "roleGroup",
  initialState,
  reducers: {
    changeRefresh: (state) => {
      state.refresh = !state.refresh;
      console.log("리덕스의 refresh 상태가 변경되었습니다.");
    },
  },
});

export const { changeRefresh } = roleGroupSlice.actions;
export default roleGroupSlice.reducer;
