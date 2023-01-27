import axios from "axios";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN, TOKEN_REFRESH_PATH } from "@constants/common";
import { getCookie, setCookie } from "@utils/cookieUtil";

/**
 * Axios 공통 인스턴스 입니다.
 * @type {AxiosInstance}
 *
 * @author 김민준
 */
const request = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/**
 * 토큰을 저장합니다.
 *
 * 엑세스 토큰은 세션 스토리지,
 * 리프레시 토큰은 쿠키에 저장합니다.
 *
 * @param response
 * @author 김민준
 */
export const setToken = (response) => {
  if (response.data) {
    sessionStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    setCookie(REFRESH_TOKEN, response.data.refresh_token, {
      path: "/",
      maxAge: 8640000,
    });
  }
};

/**
 * 기본 요청 핸들러입니다.
 *
 * 엑세스 토큰이 있으면 엑세스 토큰을 이용하여 요청하고,
 * 없으면 기존 요청을 사용합니다.
 *
 * @author 김민준
 */
export const requestHandler = (config, code) => {
  const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    return {
      ...config,
      headers: { Authorization: `Bearer ${accessToken}`,
        "Request-URI": `${code}`,
      },
    };
  }
  return { ...config };
};

/**
 * 토큰 저장 핸들러입니다.
 *
 * 엑세스 토큰이 있으면 엑세스 토큰을 이용하여 요청하고,
 * 없으면 기존 요청을 사용합니다.
 *
 * @param response
 * @author 김민준
 */
export const successHandler = (response) => {
  if (response.data.access_token) {
    setToken(response);
  }
  return response;
};

/**
 * 토큰 갱신 핸들러입니다.
 *
 * 엑세스 토큰이 만료된 경우, 쿠키에 저장된 리프레시 토큰을 이용하여
 * 토큰을 갱신하고, 갱신이 완료된 경우, 이전 요청을 재 전송합니다.
 *
 * @author 김민준
 */
export const tokenRefreshHandler = async (error) => {
  const originalRequest = error.config;
  const getRefreshTokenFromCookies = getCookie(REFRESH_TOKEN);
  await axios
    .get(`${API_URL}${TOKEN_REFRESH_PATH}`, {
      headers: { Authorization: `Bearer ${getRefreshTokenFromCookies}` },
    })
    .then((res) => {
      setToken(res);
    });

  return axios({
    ...originalRequest,
    headers: { Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}` },
  })
    .then((response) => response);
};

export default request;
