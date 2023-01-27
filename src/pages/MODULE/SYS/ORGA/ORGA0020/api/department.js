import request from "@utils/axiosUtil";

/**
 * 트리구조에서 부서를 클릭할때마다
 * 해당 부서의 상세 정보를 조회합니다.
 */
export const handleSelectDepartment = async (deptNo) => {
  console.log("클릭한 해당 부서를 상세 조회합니다");
  const { data } = await request.get(`/dept2/${deptNo}`);
  return data;
};

/**
 * 바로 밑의 하위 부서를 조회합니다.
 * @param companyNo
 * @param depth
 * @param upperDeptNo
 * @returns {Promise<any>}
 */
export const getTree = async (companyNo, depth, upperDeptNo) => {
  console.log("get Tree inner params");
  console.log("companyNo", companyNo);
  if (companyNo === "회사선택") return [];
  const { data } = await request.get(`/dept2/findTree/${companyNo}/${depth}/${upperDeptNo}`);
  return data;
};

/**
 * 회사 리스트를 조회합니다.
 * @returns {Promise<any>}
 */
export const findCompanyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

/**
 * 부서정보를 수정합니다.
 * @param deptNo
 * @returns {Promise<any>}
 */
export const modifyDept = async (deptDTO) => {
  const { data } = await request.put(`/dept2/${deptDTO.deptNo}`, deptDTO);
  return data;
};

/**
 * 부서의 사용여부를 사용에서
 * 미사용으로 변경합니다.
 * (삭제 버튼)
 * @param deptNo
 * @returns {Promise<any>}
 */
export const deleteDept = async (deptNo) => {
  const { data } = await request.get(`/dept2/remove/${deptNo}`);
  return data;
};
/**
 * 부서를 등록합니다.
 */
export const registerDept = async (deptDTO) => {
  const { data } = await request.post("dept2", deptDTO);
  return data;
};

/**
 * 부서를 부서번호, 부서명으로
 * 검색합니다.
 */
export const searchDept = async (deptSearch) => {
  const { data } = await request.get(`dept2/search?deptSearch=${deptSearch}`);
  return data;
};
