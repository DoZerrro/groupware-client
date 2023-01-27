import React, { useState } from "react";
import DeptMain from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptMain";
import useModal from "@hooks/useModal";

function Index(props) {
  const data = { menucode: "ORGA0020", menuname: "부서 관리" };
  const { openModal } = useModal();

  const handleOnModal = () => {
    openModal({ type: "ORGA0020", props: data });
  };


  return (
    <div>
      <div>
        <span>부서관리</span>
      </div>
      <div>
        <button type="button" onClick={handleOnModal}>추가</button>
        <DeptMain />
      </div>
    </div>
  );
}

export default Index;
