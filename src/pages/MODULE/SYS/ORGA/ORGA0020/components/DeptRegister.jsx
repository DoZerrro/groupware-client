import React, { useEffect, useState } from "react";
import {
  registerDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";

const initState = {
  deptName: "",
  deptDesc: "",
  upperDeptNo: "",
  companyNo: "",
  depth: "",
  mainflag: false,
};

function DeptRegister({ deptInfo }) {
  /**
   * 등록할 부서의 상태를 관리합니다.
   */
  const [regDept, setRegDept] = useState(initState);

  useEffect(() => {
    setRegDept({
      ...initState,
      companyNo: deptInfo.companyNo,
      upperDeptNo: deptInfo.upperDeptNo,
    });
  }, [deptInfo]);

  /**
   * 등록에서 input의 text타입 데이터를 담당합니다.
   */
  const regiterChange = (e) => {
    const { value, name } = e.target;
    regDept[name] = value;
    setRegDept({ ...regDept });
  };

  /**
   * 추가 버튼을 클릭하면
   * 부서가 조직도에 맞게 등록됩니다.
   */
  const regClickHandler = () => {
    registerDept(regDept).then((reuslt) => {
      setRegDept(reuslt);
      console.log("등록되었습니다.");
      Swal.fire("", "부서등록 되었습니다.", "success");
    });
  };
  return (
    <div>
      <h1>등록 컴포넌트</h1>
      <div>
        <label>회사번호</label>
        <input type="text" value={regDept.companyNo || ""} onChange={(e) => regiterChange(e)} name="companyNo" readOnly />
      </div>
      <div>
        <label>부서명</label>
        <input type="text" value={regDept.deptName || ""} onChange={(e) => regiterChange(e)} name="deptName" />
      </div>
      <div>
        <label>부서약칭</label>
        <input type="text" value={regDept.deptDesc || ""} onChange={(e) => regiterChange(e)} name="deptDesc" />
      </div>
      <div>
        <label>상위부서번호</label>
        <input type="text" value={regDept.upperDeptNo || ""} onChange={(e) => regiterChange(e)} name="upperDeptNo" readOnly />
      </div>
      <button type="button" onClick={regClickHandler}>저장</button>
    </div>
  );
}

export default DeptRegister;
