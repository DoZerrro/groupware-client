import request from "../../../../../../utils/axiosUtil";

export const getOrgaList = async ({ orgaNo, keyword, option, recursive }) => {
  const { data } = await request.get(`/orgaTree/orgaList?orgaNo=${orgaNo}&keyword=${keyword}&option=${option}&recursive=${recursive}`);
  return data;
};

export const getChildNode = async (upperDeptNo, depth, companyNo) => {
  const { data } = await request.get(`/orgaTree/list/${upperDeptNo}/${depth}/${companyNo}`);
  return data;
};
