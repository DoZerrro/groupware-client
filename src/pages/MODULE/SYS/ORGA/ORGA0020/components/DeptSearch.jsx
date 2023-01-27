import React, { useState } from "react";
import { searchDept } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import Swal from "sweetalert2";

function DeptSearch({
  companyList,
  setSelectCompany,
  setDeptList,
}) {

  /**
   * 검색어를 담을 상태값입니다.
   */
  const [deptSearch, setDeptSearch] = useState("");

  /**
   * 부서번호와 부서이름을 반아올
   * handler입니다.
   */
  const changeDeptSearch = (e) => {
    const { value } = e.target;
    console.log("부서검색입력 : ", value);
    setDeptSearch(value);
  };

  /**
   * 검색결과를 받아올
   * handler입니다.
   * @param deptNo
   * @param deptName
   */
  const deptListBySearch = () => {
    searchDept(deptSearch).then((list) => {
      Swal.fire("검색 완료", `${list.length}건 검색`, "success").then(() => {

        console.log("부서 리스트 : ", list);
        setDeptList(list);
      });
    });
  };

  return (
    <div>
      <div>
        <select
          name="company"
          className="secondTwoSelect"
          onChange={(e) => {
            setSelectCompany(e.target.value);
          }}
        >
          <option>회사선택</option>
          {companyList.map((item) => (
            <option
              key={item.companyNo}
              value={item.companyNo}
            >
              {item.companyName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <input
          type="text"
          placeholder="부서번호/부서명으로 검색"
          onChange={(e) => { changeDeptSearch(e); }}
        />
        <button
          type="submit"
          onClick={() => { deptListBySearch(); }}
        >
          검색
        </button>
      </div>
    </div>
  );
}

export default DeptSearch;
