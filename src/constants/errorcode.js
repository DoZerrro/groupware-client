/**
 * 에러코드 전역 상수입니다.
 *
 * @author 김민준
 */

export const ERROR_CODE = {
  UNAUTHORIZED: 401, NOT_FOUND: 404, INTERNAL_SERVER_ERROR: 500,
};

export const MENU_NOT_FOUND = {
  status: ERROR_CODE.NOT_FOUND, code: "MENU_NOT_FOUND", detailErrorCode: 100,
};

export const UNAUTHORIZED_MEMBER = {
  status: ERROR_CODE.UNAUTHORIZED, code: "UNAUTHORIZED_MEMBER", detailErrorCode: 101,
};

export const INVALID_USER = {
  status: ERROR_CODE.UNAUTHORIZED, code: "INVALID_USER", detailErrorCode: 200,
};

export const TOKEN_MISSING = {
  status: ERROR_CODE.UNAUTHORIZED, code: "TOKEN_MISSING", detailErrorCode: 300,
};

export const ACCESS_TOKEN_EXPIRED = {
  status: ERROR_CODE.UNAUTHORIZED, code: "ACCESS_TOKEN_EXPIRED", detailErrorCode: 301,
};

export const REFRESH_TOKEN_EXPIRED = {
  status: ERROR_CODE.UNAUTHORIZED, code: "REFRESH_TOKEN_EXPIRED", detailErrorCode: 302,
};

export const REDIS_USER_NOT_FOUND = {
  status: ERROR_CODE.NOT_FOUND, code: "REDIS_USER_NOT_FOUND", detailErrorCode: 400,
};

export const FOREIGN_KEY_ERROR = {
  status: ERROR_CODE.INTERNAL_SERVER_ERROR, code: "FOREIGN_KEY_ERROR", detailErrorCode: 500,
};
