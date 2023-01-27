import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";

const getDeptMember = async (orgaNo) => {
  const { data } = await request(`/dept2/member/${orgaNo}`);
  return data;
};

function DeptMemberInfo({ orgaNo }) {

  /**
   * 부서원 리스트의 상태를 관리합니다.
   */
  const [memList, setMemList] = useState([]);

  /**
   * 부서원 정보를 가져옵니다.
   */
  useEffect(() => {
    getDeptMember(orgaNo).then((list) => {
      setMemList(list);
    });
  }, [orgaNo]);

  return (
    <>
      <div>
        <span>부서</span>
        <span>직급</span>
        <span>사용자명</span>
        <span>아이디</span>
        <span>전화번호</span>
      </div>
      <div>
        {memList ? (
          <div>
            {memList.map(({ deptName, empRank, empName, username, empPhone }) => (
              <div key={empPhone}>
                {deptName}
                {empRank}
                {empName}
                {username}
                {empPhone}
              </div>
            ))}
          </div>
        ) : <></>}
      </div>
    </>
  );
}

export default DeptMemberInfo;
