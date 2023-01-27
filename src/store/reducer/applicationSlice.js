import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import request from "@utils/axiosUtil";
import { MENU_API_PATH } from "@constants/common";

const name = "application";

const initialState = {
  routes: [],
  title: "",
  lnbSidebar: true,
  subHeader: true,
  pages: "",
  gnb: 0,
};
export const applicationSelector = (state) => state.application;

/**
 * 클라이언트 앱 초기화용 메소드입니다.
 * 메뉴에 맞는 모듈 경로와 메뉴번호를 반환합니다.
 * @return {Promise<AxiosResponse<any>>}
 * @constructor
 * @author 김민준
 */
export const GET_INIT_ROUTES = createAsyncThunk(`${name}/GET_INIT_ROUTES`, async () => {
  const res = await request.get(`${MENU_API_PATH}/init`);
  return res.data;
});

/**
 * 어플리케이션 전역 상태입니다.
 * @type {Slice<{routes: *[], pageTitle: string}, {SET_TITLE(*, *): void}, string>}
 * @author 김민준
 */
const applicationSlice = createSlice({
  name,
  initialState,
  reducers: {
    SET_TITLE(state, action) {
      state.title = action.payload;
    },
    SET_PAGES(state, action) {
      state.pages = action.payload;
    },
    SET_GNB(state, action) {
      state.gnb = action.payload;
    },
    SET_LNBSIDEBAR(state, action) {
      state.lnbSidebar = action.payload;
    },
    SET_SUBHEADER(state) {
      state.subHeader = !state.subHeader;
    },
  },
  extraReducers: {
    [GET_INIT_ROUTES.fulfilled]: (state, action) => {
      const { payload } = action;
      state.routes = payload;
    },
  },

});

export default applicationSlice.reducer;
export const { SET_TITLE, SET_LNBSIDEBAR, SET_GNB, SET_SUBHEADER, SET_PAGES } = applicationSlice.actions;
