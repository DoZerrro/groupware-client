import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import { companyList } from "@pages/MODULE/SYS/ORGA/ORGA0030/pages/Insert";
import Swal from "sweetalert2";
import {
  EmpButtonWrapper, EmpInformationBtn,
  EmpInsertBody, EmpInsertExplainDiv,
  EmpInsertHeader,
  EmpInsertWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import Button from "@components/Button";

const deptList = async (companyNo) => {
  const { data } = await request.get(`/dept2/readName/${companyNo}`);
  return data;
};

const empOrgaRegister = async (orga) => {
  const { data } = await request.post("/emp/registerOrga", orga);
  return data;
};

const empOrgaList = async (empNo) => {
  const { data } = await request.get(`/emp/readOrga/${empNo}`);
  return data;
};

const orgaInitState = {
  empNo: 0,
  companyNo: 0,
  deptNo: 0,
  empRank: "",
  orgaNo: 0,
  retiredDate: "",
};

function RegisterOrgaModal({ orga }) {
  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [orgaChange, setOrgaChange] = useState(orgaInitState);
  const [department, setDepartment] = useState([]);
  const [company, setCompany] = useState([]);
  const [orgaInfo, setOrgaInfo] = useState([]);

  useEffect(() => {
    companyList().then((data) => {
      setCompany(data);
    });
    orgaChange.empNo = orga[0].empNo;
  }, []);

  // 선택한 회사의 목록 정보 출력
  const handleOnChangeCompany = (e) => {
    const { value } = e.target;
    deptList(value).then((data) => {
      setDepartment(data);
    });
    setOrgaChange({ ...orgaChange, companyNo: value });
  };

  const handleOnChangeOrgaRegisterInput = (e) => {
    const { name, value } = e.target;
    setOrgaChange({ ...orgaChange, [name]: value });
  };

  const handleOnClickOrgaRegisterSubmit = () => {
    console.log(orgaChange);
    if (orgaChange.companyNo === 0 || orgaChange.deptNo === 0 || orgaChange.empRank === "") {
      Swal.fire("미입력 항목 존재", "항목을 모두 입력해주세요.", "warning").then();
    } else {
      empOrgaRegister(orgaChange).then(() => {
        // 여기말고 그 저기서 set해야해서 안되나봄.
        // empOrgaList(orgaChange.empNo).then((info) => {
        //   setOrgaInfo(info);
        // });
        closeModal();
      });
    }
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="사원 회사/부서 추가"
    >
      <EmpInsertWrapper>
        <div>
          <div>
            <EmpInsertExplainDiv>* 은 필수 항목입니다.</EmpInsertExplainDiv>

            <EmpInsertHeader>
              회사*
            </EmpInsertHeader>
            <EmpInsertBody>
              <select
                name="companyNo"
                onChange={(e) => {
                  handleOnChangeCompany(e);
                }}
              >
                <option value="0" key="-">--회사 선택--</option>
                {company.map((com) => (
                  <option key={com.companyNo} value={com.companyNo}>
                    {com.companyName}
                  </option>
                ))}
              </select>
            </EmpInsertBody>

            <EmpInsertHeader>
              부서*
            </EmpInsertHeader>
            <EmpInsertBody>
              <select
                name="deptNo"
                onChange={(e) => {
                  handleOnChangeOrgaRegisterInput(e);
                }}
              >
                <option value="0" key="-">--부서 선택--</option>
                {department.map((dept) => (
                  <option key={dept.deptNo} value={dept.deptNo}>
                    {dept.deptName}
                  </option>
                ))}
              </select>
            </EmpInsertBody>

            <EmpInsertHeader>
              직급*
            </EmpInsertHeader>
            <EmpInsertBody>
              <select
                name="empRank"
                onChange={(e) => {
                  handleOnChangeOrgaRegisterInput(e);
                }}
              >
                <option value="-">--직급 선택--</option>
                <option value="회장" key="회장">회장</option>
                <option value="사장" key="사장">사장</option>
                <option value="이사" key="이사">이사</option>
                <option value="부장" key="부장">부장</option>
                <option value="과장" key="과장">과장</option>
                <option value="대리" key="대리">대리</option>
                <option value="주임" key="주임">주임</option>
                <option value="사원" key="사원">사원</option>
                <option value="인턴" key="인턴">인턴</option>
                <option value="일용직" key="일용직">일용직</option>
              </select>
            </EmpInsertBody>

            <EmpButtonWrapper>
              <EmpInformationBtn
                type="button"
                onClick={() => {
                  handleOnClickOrgaRegisterSubmit();
                }}
              >추가
              </EmpInformationBtn>

              <EmpInformationBtn
                type="button"
                onClick={() => {
                  handleCloseModal();
                }}
              >취소
              </EmpInformationBtn>
            </EmpButtonWrapper>
          </div>

        </div>
      </EmpInsertWrapper>
    </Modal>
  );
}

export default RegisterOrgaModal;
