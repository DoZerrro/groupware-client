import React, { useState } from "react";
import "../view.css";
import {
  deleteDept,
  handleSelectDepartment,
  modifyDept,
} from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";

function DeptBasicInfo({
  selectDepartment,
  inputChangeHandler,
  setSelectDepartment,
}) {
  const { deptNo, deptName, deptDesc, mainFlag, regUser } = selectDepartment;

  /**
   * 수정 버튼을 클릭하면 입력한 데이터에
   * 맞게 내용을 수정합니다.
   */
  const modClickHandler = () => {
    modifyDept(selectDepartment).then(() => {
      console.log("complete");
      Swal.fire("","수정이 완료되었습니다.", "success");
    });
  };

  /**
   * 부서를 삭제합니다
   * (부서 사용여부 '사용'인 부서를
   * '미사용'으로 변경해줍니다.)
   */
  const clickRemoveHandler = () => {
    if (mainFlag === true) {
      deleteDept(deptNo).then(() => {
        Swal.fire("변경 완료", "미사용처리 되었습니다.", "success").then(() => {
          handleSelectDepartment(deptNo).then((data) => {
            setSelectDepartment(data);
          });
        });
      });
    } else {
      Swal.fire("변경 실패", "이미 미사용 부서입니다.", "warning");
    }
  };

  return (
    <div className="deptData">
      <div className="deptItem">
        <div>부서번호</div>
        <div>
          <input
            type="text"
            value={deptNo || ""}
            name="deptNo"
            onChange={(e) => inputChangeHandler(e)}
            readOnly
          />
        </div>
      </div>
      <div className="deptItem">
        <div>부서명</div>
        <div>
          <input
            type="text"
            value={deptName || ""}
            name="deptName"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
      </div>
      <div className="deptItem">
        <div>부서 약칭</div>
        <div>
          <input
            type="text"
            value={deptDesc || ""}
            name="deptDesc"
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
      </div>
      <div className="deptItem">
        <div>사용 여부</div>
        <div>
          <input
            type="radio"
            name="mainFlag"
            value="true"
            checked={mainFlag === true}
            onChange={(e) => inputChangeHandler(e)}
          />사용
          <input
            type="radio"
            name="mainFlag"
            value="false"
            checked={mainFlag === false}
            onChange={(e) => inputChangeHandler(e)}
          />미사용
        </div>
      </div>
      <div className="deptItem">
        <div>등록자명</div>
        <div>
          <input
            type="text"
            name="regUser"
            value={regUser || ""}
            readOnly
          />
        </div>
      </div>
      <div>
        <button type="button" onClick={modClickHandler}>수정</button>
        <button type="button" onClick={clickRemoveHandler}>삭제</button>
      </div>
    </div>
  );
}

export default DeptBasicInfo;
