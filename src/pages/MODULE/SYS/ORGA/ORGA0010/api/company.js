import request from "../../../../../../utils/axiosUtil";

// 회사 정보 검색 요청
export const getCompanySearch = async (companyUse, companySearch) => {
  const { data } = await request.get(`/company/search?companyUse=${companyUse}&companySearch=${companySearch}`);

  return data;
};

// 회사 정보 리스트 요청
export const getCompanyList = async () => {
  const { data } = await request.get("/company/list");

  return data;
};

// 해당 회사 정보 요청
export const getCompanyInformation = async (companyNo) => {
  const { data } = await request.get(`/company/information/${companyNo}`);

  return data;
};

// 회사 기본정보 추가 요청
export const registerCompanyInformation = async (information) => {
  await request.post("/company/register", information);
};

// 회사 기본정보 수정 요청
export const ModifyCompanyInformation = async (information) => {
  await request.put(`/company/modify/${information.companyNo}`, information);
};

// 회사 기본정보 삭제(사용여부를 '미사용'으로 변경) 요청
export const RemoveCompanyInformation = async (companyNo) => {
  await request.get(`/company/remove/${companyNo}`);
};
