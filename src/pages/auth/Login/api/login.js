import request, { setToken } from "@utils/axiosUtil";
import { REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, removeCookie } from "@utils/cookieUtil";

export const GET_CHECK_REFRESH = async () => {
  await request.get(TOKEN_REFRESH_PATH, { headers: {
    Authorization: `Bearer ${getCookie(REFRESH_TOKEN)}`,
  } }).then((res) => {
    setToken(res.data);
  }).catch(() => {
    removeCookie(REFRESH_TOKEN);
  });
};

export const POST_LOGIN = async (loginFormData) => {
  return request.post("/login", loginFormData);
};

export const GET_REDIS_CHECK = async () => {
  return request.get("/login/userinfo");
};
