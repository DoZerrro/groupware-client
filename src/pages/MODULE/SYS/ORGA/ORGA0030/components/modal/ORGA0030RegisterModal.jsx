import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import request from "@utils/axiosUtil";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  EmpInsertWrapper,
  Button,
  EmpButtonWrapper,
  EmpInformationBtn,
  EmpInsertExplainDiv, EmpInsertHeader, EmpInsertBody, EmpInsertInput,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const empRegister = async (emp) => {
  const { data } = await request.post("/emp/register", emp);
  return data;
};

export const companyList = async () => {
  const { data } = await request.get("/company/list");
  return data;
};

const deptList = async (companyNo) => {
  const { data } = await request.get(`/dept2/readName/${companyNo}`);
  return data;
};

const initState = {
  companyNo: 0,
  deptNo: 0,
  empRank: "",
  empName: "",
  username: "",
  password: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
  empUse: 1,
  passwordCheck: "",
};

function Orga0030RegisterModal() {
  // 모달 close
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const [employee, setEmployee] = useState(initState);
  const [company, setCompany] = useState([]);
  const [department, setDepartment] = useState([]);

  const history = useHistory();

  useEffect(() => {
    companyList()
      .then((data) => {
        setCompany(data);
      });
  }, []);

  // 회사 선택 시 (선택 회사 정보 변경 시) 실행되는 함수
  const handleOnChangeCompany = (e) => {
    const { value } = e.target;
    setEmployee({
      ...employee,
      companyNo: value,
    });
    deptList(value)
      .then((data) => {
        setDepartment(data);
      });
  };

  const [usernameError, setUsernameError] = useState(false);


  // 사원 정보 입력값 변경 시 실행되는 함수
  const handleOnChangeEmployee = (e) => {
    const {
      name,
      value,
    } = e.target;

    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // 사원 username 유효성 실행
  const handleOnChangeUsername = (e) => {
    const { name, value } = e.target;

    const usernameRegex = /^[a-z0-9]{3,12}$/;

    if ((!value || (usernameRegex.test(value)))) {
      setUsernameError(false);
      setEmployee({
        ...employee,
        [name]: value,
      });
    } else {
      setUsernameError(true);
    }
  };


  const handleOnClickPasswordCheck = () => {
    if (employee.password === employee.passwordCheck) {
      Swal.fire("비밀번호 확인", "동일한 비밀번호입니다.", "success").then();
    }
    if (employee.password !== employee.passwordCheck) {
      Swal.fire("비밀번호 불일치", "비밀번호를 확인해주세요.", "warning").then();
    }
  };


  const clickEmpAdd = () => {
    if (employee.companyNo === 0 || employee.deptNo === 0 || employee.empRank === ""
        || employee.empName === "" || employee.username === "" || employee.password === ""
        || employee.gender === "") {
      Swal.fire("미입력 항목 존재", "필수값을 모두 입력해주세요.", "warning").then();
    } else if (employee.password !== employee.passwordCheck) {
      Swal.fire("비밀번호 불일치", "비밀번호를 확인해주세요.", "warning").then();
    } else {
      empRegister(employee)
        .then(() => {
          setEmployee(employee);
          closeModal();
          history.replace("/SYS/ORGA/ORGA0030");
        });
    }
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="사원 추가"
    >
      <EmpInsertWrapper>
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
            <option value="0">--회사 선택--</option>
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
              handleOnChangeEmployee(e);
            }}
          >
            <option value="0">--부서 선택--</option>
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
              handleOnChangeEmployee(e);
            }}
          >
            <option value="-">--직급 선택--</option>
            <option value="회장">회장</option>
            <option value="사장">사장</option>
            <option value="이사">이사</option>
            <option value="부장">부장</option>
            <option value="과장">과장</option>
            <option value="대리">대리</option>
            <option value="주임">주임</option>
            <option value="사원">사원</option>
            <option value="인턴">인턴</option>
            <option value="일용직">일용직</option>
          </select>
        </EmpInsertBody>

        <EmpInsertHeader>
          이름*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="text"
            name="empName"
            placeholder="이름을 입력하세요."
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>

        <EmpInsertHeader>
          ID*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="text"
            name="username"
            placeholder="3글자 이상 소문자, 숫자"
            onChange={(e) => {
              handleOnChangeUsername(e);
            }}
          />
          {usernameError && <span>3글자 이상 소문자 또는 숫자만 입력 가능합니다.</span>}
        </EmpInsertBody>

        <EmpInsertHeader>
          비밀번호*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="password"
            name="password"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>


        <EmpInsertHeader>
          비밀번호 확인*
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="password"
            name="passwordCheck"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>

        <Button type="button" onClick={() => { handleOnClickPasswordCheck(); }}>확인</Button>


        <EmpInsertHeader>
          성별*
        </EmpInsertHeader>
        <EmpInsertBody>
          <select
            name="gender"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          >
            <option value="-">--성별 선택--</option>
            <option value="남성">남성</option>
            <option value="여성">여성</option>
          </select>
        </EmpInsertBody>


        <EmpInsertHeader>
          이메일
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="email"
            name="email"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>


        <EmpInsertHeader>
          휴대전화
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="number"
            name="empPhone"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>

        <EmpInsertHeader>
          주소
        </EmpInsertHeader>
        <EmpInsertBody>
          <EmpInsertInput
            type="text"
            name="empAddress"
            onChange={(e) => {
              handleOnChangeEmployee(e);
            }}
          />
        </EmpInsertBody>

        <EmpButtonWrapper>
          <EmpInformationBtn
            type="submit"
            onClick={() => {
              clickEmpAdd();
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
      </EmpInsertWrapper>
    </Modal>
  );
}

export default Orga0030RegisterModal;
