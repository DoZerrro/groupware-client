import React, { useEffect, useState } from "react";
import request from "@utils/axiosUtil";
import EmpInsert from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpInsert";
import { useHistory } from "react-router-dom";

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
  empRole: "",
  empUse: 1,
};

function Index() {
  const [employee, setEmployee] = useState(initState);
  const [company, setCompany] = useState([]);
  const [department, setDepartment] = useState([]);

  const history = useHistory();

  useEffect(() => {
    companyList().then((data) => {
      setCompany(data);
    });
  }, []);

  // 회사 선택 시 (선택 회사 정보 변경 시) 실행되는 함수
  const handleOnChangeCompany = (e) => {
    const { value } = e.target;
    setEmployee({ ...employee, companyNo: value });
    deptList(value).then((data) => {
      setDepartment(data);
    });
  };

  // 사원 정보 입력값 변경 시 실행되는 함수
  const handleOnChangeEmployee = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  /// //////////////
  const idCheck = () => {

  };
  /// //////////////

  const clickEmpAdd = () => {
    empRegister(employee).then(() => {
      setEmployee(employee);
      history.replace("/SYS/ORGA/ORGA0030");
    });
  };

  const clickMoveEmpListPage = () => {
    history.replace("/SYS/ORGA/ORGA0030");
  };

  return (
    <EmpInsert
      company={company}
      handleOnChangeEmployee={handleOnChangeEmployee}
      clickEmpAdd={clickEmpAdd}
      clickMoveEmpListPage={clickMoveEmpListPage}
      idCheck={idCheck}
      handleOnChangeCompany={handleOnChangeCompany}
      department={department}
    />
  );
}

export default Index;
