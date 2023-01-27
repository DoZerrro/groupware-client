import request from "../../../../../../utils/axiosUtil";

/* RoleGroup Based Page */

export const getCompanyList = async () => {
  const { data } = await request.get("/userrole/companyListAll");
  return data;
};

export const getGroupListByRole = async ({ page, size, orgaNo, keyword1 }) => {
  const { data } = await request.get(`/userrole/roleGroupList?page=${page}&size=${size}&orgaNo=${orgaNo}&keyword1=${keyword1}`);
  return data;
};

export const getUserListByRole = async ({ page, size, orgaNo, roleGroupNo, keyword1 }) => {
  const { data } = await request.get(`/userrole/roleGroupUserList?page=${page}&size=${size}&orgaNo=${orgaNo}&roleGroupNo=${roleGroupNo}&keyword1=${keyword1}`);
  return data;
};

export const insertOrgaRole = async (inputData) => {
  const { data } = await request.post("/userrole/insertOrgaRole", inputData);
  return data;
};

export const removeOrgaRole = async (removeData) => {
  const { data } = await request.post("/userrole/removeOrgaRole", removeData);
  return data;
};

/* User Based Page */

export const getUserListByUser = async ({ page, size, orgaNo, keyword1, keyword2 }) => {
  const { data } = await request.get(`/userrole/findUserListByOrgaNo?page=${page}&size=${size}&orgaNo=${orgaNo}&keyword1=${keyword1}&keyword2=${keyword2}`);
  return data;
};

export const getGroupListByUser = async ({ page, size, orgaNo }) => {
  const { data } = await request.get(`/userrole/findRoleGroupByUser?page=${page}&size=${size}&orgaNo=${orgaNo}`);
  return data;
};

export const removeUserRole = async (removeData) => {
  const { data } = await request.post("/userrole/removeOrgaRoleByAllRole", removeData);
  return data;
};
