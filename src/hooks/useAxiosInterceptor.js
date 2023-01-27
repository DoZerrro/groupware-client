import React, { useEffect, useRef } from "react";
import request, {
  requestHandler,
  successHandler,
  tokenRefreshHandler,
} from "@utils/axiosUtil";
import { useHistory } from "react-router-dom";
import {
  ACCESS_TOKEN_EXPIRED,
  FOREIGN_KEY_ERROR,
  REFRESH_TOKEN_EXPIRED,
  UNAUTHORIZED_MEMBER,
} from "@constants/errorcode";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@constants/common";
import { removeCookie } from "@utils/cookieUtil";
import Swal from "sweetalert2";

/**
 * Axios 인터셉터 Hooks 입니다.
 *
 * 앱 내 공통 HTTP Client의 모든 요청과 응답을 가로채고,
 * 요청에 따른 응답을 분기로 나누어 처리 할 수 있습니다.
 *
 * @constructor
 * @author 김민준
 */
const UseAxiosInterceptor = () => {
  const history = useHistory();

  const responseInterceptor = request.interceptors.response.use(
    (response) => successHandler(response),
    (error) => {

      // FIXME
      const { detailErrorCode, message } = error.response.data?.body ? error.response.data.body : error.response.data;

      if (detailErrorCode === FOREIGN_KEY_ERROR.detailErrorCode) {
        Swal.fire(message, message, "error");
      }

      if (detailErrorCode === UNAUTHORIZED_MEMBER.detailErrorCode) {
        Swal.fire(message, message, "error");
        history.push("/");
      }

      if (detailErrorCode === ACCESS_TOKEN_EXPIRED.detailErrorCode) {
        return tokenRefreshHandler(error)
          .catch((err) => {
            const tokenRefreshError = err.response.data;
            if (tokenRefreshError.detailErrorCode === REFRESH_TOKEN_EXPIRED.detailErrorCode) {
              sessionStorage.removeItem(ACCESS_TOKEN);
              removeCookie(REFRESH_TOKEN);
              history.push("/");
              location.reload();
            }
          });
      }
      return Promise.reject(error);
    },
  );


  const requestInterceptor = request.interceptors.request.use(
    (config) => requestHandler(config, history.location.pathname),
    (error) => Promise.reject(error),
  );

  useEffect(() => {
    return () => {
      request.interceptors.request.eject(requestInterceptor);
      request.interceptors.response.eject(responseInterceptor);
    };
  }, [requestInterceptor, responseInterceptor]);
};

export default UseAxiosInterceptor;
