import React, { useEffect, useState } from "react";
import { getChildNode, getOrgatreeEmpList } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";
import { MainTreeContainerWrapper } from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import CommonTreeNode from "./CommonTreeNode";


function CommonTreeContainer({ deptNo = 1, depth = 0, companyNo, setEmpList, setEmpInfo }) {
  const [arr, setArr] = useState([]);

  const changeTarget = (e, currentTarget) => {
    const { target } = e;
    if (target.tagName !== "SPAN") return;
    const mainTreeOrgaSpan = document.querySelectorAll(".mainTreeOrgaSpan");
    mainTreeOrgaSpan.forEach((el) => el.classList.remove("active"));
    target.classList.add("active");

    getOrgatreeEmpList(currentTarget).then((data) => {
      console.log(data);
      setEmpList(data);
      setEmpInfo({});// 회사 부서 선택 시 사원 Detail
    });

    console.log("target deptNo", currentTarget);
  };


  useEffect(() => {
    getChildNode(deptNo, depth, companyNo).then((data) => {
      // console.log(data)
      setArr(data);
    });
  }, [deptNo, depth, companyNo]);


  return (
    <MainTreeContainerWrapper>
      <CommonTreeNode key={companyNo} arr={arr} changeTarget={changeTarget} />
    </MainTreeContainerWrapper>
  );
}

export default CommonTreeContainer;
