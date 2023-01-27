import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid } from "@components/Grid";
import { findCompanyList } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import DeptRegister from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptRegister";
import DeptTreeItem from "@pages/MODULE/SYS/ORGA/ORGA0020/components/DeptTreeItem";
import styled from "styled-components";

const ORGA0020Modal = () => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  /**
   * 모달창에서 회사 리스트를 상태 관리합니다.
   */
  const [modalCompanyList, setModalCompanyList] = useState([]);

  /**
   * 모달창에서 검색조건에 사용할 회사 선택 사항입니다.
   */
  const [modalSelectCompanyNo, setModalSelectCompanyNo] = useState(0);

  /**
   * 부서 정보 데이터 상태를 관리합니다.
   */
  const [deptInfo, setDeptInfo] = useState({});



  /**
   * 모달창에서 트리 구조도를 조회합니다.
   */
  const [topDept, setTopDept] = useState([]);

  /**
   * 모달창에서 트리구조를 선택할 때
   * 해당 부서의 필요한 정보를 조회합니다.
   * @param cNo
   * @param upperDNo
   */
  const clickDept = (cNo, upperDNo) => {
    console.log("click clickDept");
    console.log("companyNo", cNo);
    console.log("upperDeptNo", upperDNo);
    setDeptInfo({
      companyNo: cNo,
      upperDeptNo: upperDNo === null ? 0 : upperDNo,
    });
  };

  /**
   * 회사 목록을 조회합니다.
   */
  useEffect(() => {
    findCompanyList().then((result) => {
      setModalCompanyList(result);
    });
  }, []);

  return (
    <Modal
      onClose={handleCloseModal}
      title="부서 등록"
    >
      <Pass>
        <span>부서를 등록하는 화면입니다.</span>
      </Pass>
      <CenterGrid>
        <div>
          <DeptTreeDiv>
            <select
              name="company"
              className="secondTwoSelect"
              onChange={(e) => {
                setModalSelectCompanyNo(e.target.value);
              }}
            >
              <option>회사선택</option>
              {modalCompanyList.map((item) => (
                <option
                  key={item.companyNo}
                  value={item.companyNo}
                >
                  {item.companyName}
                </option>
              ))}
            </select>
          </DeptTreeDiv>
          <DeptTreeItem
            clickDept={clickDept}
            selectCompany={modalSelectCompanyNo}
          />
        </div>
        <DeptRegister deptInfo={deptInfo} />
      </CenterGrid>
    </Modal>

  );
};

export default ORGA0020Modal;

const Pass = styled.div`
  border-bottom: 1px solid black;
`;

const DeptTreeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-top: 1em;
`;
