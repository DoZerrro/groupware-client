import request from "@utils/axiosUtil";

// 회사번호를 가져오기 위한 회사정보 요청
export const getCompanyNoArr = async () => {
  const { data } = await request.get("/company/list");

  return data;
};

// 로그인한 사원의 마이그룹 리스트를 요청
export const getMygroupList = async () => {
  const { data } = await request.get("/mygroup/list");

  return data;
};

// 마이그룹에 즐겨찾기 된 모든 사원의 정보를 요청
export const getFavoriteEmpList = async (mygroupNo) => {
  const { data } = await request.get(`/favorite/list/${mygroupNo}`);

  return data;
};

// 해당 사원의 정보를 요청
export const getEmpInformation = async (empNo) => {
  const { data } = await request.get(`/orgatree/information/${empNo}`);

  return data;
};

// 해당 마이그룹에 즐겨찾기 된 사원 삭제 요청
export const deleteFavoriteEmp = async (mygroupNo, orgaNo) => {
  await request.delete(`/favorite/remove/${mygroupNo}/${orgaNo}`);
};

// 로그인한 사원의 새 마이그룹 생성 요청
export const registerMygroup = async () => {
  await request.post("/mygroup/register");
};

// 해당 마이그룹 삭제 요청
export const removeMygroup = async (mygroupNo) => {
  await request.delete(`/mygroup/remove/${mygroupNo}`);
};

// 해당 마이그룹 이름 수정 요청
export const modifyMygroup = async (modifyMy) => {
  await request.put(`/mygroup/modify/${modifyMy.mygroupNo}`, modifyMy);
};

// 해당 마이그룹 조회 요청
export const getMygroupInformation = async (mygroupNo) => {
  const { data } = await request.get(`/mygroup/information/${mygroupNo}`);

  return data;
};

// 로그인한 사원의 마이그룹에 사원 즐겨찾기 요청
export const registerFavorite = async (favoriteInfo) => {
  const { data } = await request.post("/favorite/register", favoriteInfo);

  return data;
};


export const getChildNode = async (upperDeptNo, depth, companyNo) => {
  const res = await request.get(`/orgatree/tree/${upperDeptNo}/${depth}/${companyNo}`);

  return res.data;
};

// 해당 부서에 소속된 모든 사원 정보를 요청
export const getOrgatreeEmpList = async (orgaNo) => {
  const { data } = await request.get(`/orgatree/list/${orgaNo}`);

  return data;
};
