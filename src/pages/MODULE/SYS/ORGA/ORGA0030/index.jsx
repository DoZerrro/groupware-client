import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import request from "@utils/axiosUtil";
import EmpInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpInformation";
import { companyList } from "@pages/MODULE/SYS/ORGA/ORGA0030/pages/Insert";
import Swal from "sweetalert2";
import {
  ModuleInnerMainContentWrapper,
  ModuleInnerTitle, ModuleInnerTitleWrapper,
  ModuleInnerWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const empList = async () => {
  const { data } = await request.get("/emp/information");
  return data;
};

const empRead = async (empNo) => {
  const { data } = await request.get(`/emp/read/${empNo}`);
  return data;
};

const empModify = async (empInfo) => {
  const { data } = await request.put(`/emp/modify/${empInfo.empNo}`, empInfo);
  return data;
};

const deptList = async (companyNo) => { // TODO redux
  const { data } = await request.get(`/dept2/readName/${companyNo}`);
  return data;
};

const empOrgaRegister = async (orga) => {
  const { data } = await request.post("/emp/registerOrga", orga);
  return data;
};

const empOrgaModify = async (orga) => {
  const listData = {
    list: orga,
  };

  const { data } = await request.put("/emp/modifyOrga", listData);
  return data;
};

const empOrgaList = async (empNo) => {
  const { data } = await request.get(`/emp/readOrga/${empNo}`);
  return data;
};

const initState = {
  empNo: 0,
  empName: "",
  username: "",
  gender: "",
  email: "",
  empPhone: "",
  empAddress: "",
  firstHiredDate: "",
  lastRetiredDate: "",
  empUse: "",
  modDate: "",
  preview: null,
};

const orgaInitState = {
  empNo: 0,
  companyNo: 0,
  deptNo: 0,
  empRank: 0,
  empRole: true,
  orgaNo: 0,
  retiredDate: "",
};

function Index() {
  // 사원 리스트
  const [emps, setEmps] = useState([]);

  // 사원 상세정보(selectOne)
  const [empInformation, setEmpInformation] = useState(initState);

  // 조직 정보 수정
  const [orga, setOrga] = useState([]);

  // 수정할 조직 번호
  const [orgaModifyNo, setOrgaModifyNo] = useState(0);

  // 조직 추가될 때, input Change 받는 상태
  const [orgaChange, setOrgaChange] = useState(orgaInitState);

  // 조직 정보를 보기 위해 버튼 클릭 시 컴포넌트를 변경하기 위한 상태를 담은 변수 선언
  const [view, setVeiw] = useState(true);

  // 기본 정보, 조직 정보 span 글자 색상 변경 ( style )
  const [basicColor, setBasicColor] = useState("#46A3FB");
  const [orgaColor, setOrgaColor] = useState("gray");

  const [company, setCompany] = useState([]);

  const [refresh, setRefresh] = useState(true);

  const history = useHistory();

  const setTargetActive = (e) => {
    let { target } = e;
    if ((target.tagName !== "SPAN")) {
      while (!target.classList.contains("employeeListItemDiv")) {
        target = target.parentElement;
      }
      const employeeListItemDivs = document.querySelectorAll(".employeeListItemDiv");
      employeeListItemDivs.forEach((employeeListItemDiv) => employeeListItemDiv.classList.remove("active"));
      target.classList.add("active");
    }
  };

  // 사원 정보가 담긴 컴포넌트를 부르기 위한 함수 선언
  const clickEmp = (e, empNo) => {
    setEmpInformation({ ...initState });
    setBasicColor("#46A3FB");
    setOrgaColor("gray");
    setVeiw(true);

    setTargetActive(e);

    empRead(empNo).then((data) => {
      setEmpInformation(data);
    });
  };

  // 조직 정보가 담긴 컴포넌트를 부르기 위한 함수 선언
  const clickOrga = (e, empNo) => {
    setBasicColor("gray");
    setOrgaColor("#46A3FB");
    setVeiw(false);

    empOrgaList(empNo).then((data) => {
      setOrga(data);
    });
  };

  // 추가 버튼 클릭 시, register 페이지로 이동
  const clickEmpRegister = () => {
    history.push("ORGA0030/register");
  };

  // boolean값 들어오는 empUse는 String으로 변경해준다.
  const changeBoolean = (value) => {
    let booleanValue = true;

    if (value && typeof value === "string") {
      if (value.toLowerCase() === "false") {
        booleanValue = false;
      }
    }

    return booleanValue;
  };

  // 사원 정보 수정할 때, input의 onChange 이벤트 실행 함수
  const changeEmpInput = (e) => {
    const { name, value } = e.target;

    if (name === "empUse") {
      empInformation[name] = changeBoolean(value);
    } else {
      empInformation[name] = value;
    }

    setEmpInformation({ ...empInformation });
  };

  // 사원 정보 입력 후, 수정 버튼 클릭 실행 함수
  const clickEmpModify = () => {
    empModify(empInformation).then(() => {
      empList().then((data) => {
        setEmps(data);
        Swal.fire("수정 완료", "사원 정보가 변경되었습니다.", "success").then(() => {
          // 다시 정보를 부르고 그 정보를 set해준다.
          empRead(empInformation.empNo).then((info) => {
            setEmpInformation(info);
          });
        });
      });
    });
  };

  // 화면 로딩 시, 사원 목록 출력하기
  useEffect(() => {
    empList().then((data) => {
      setEmps(data);
    });
  }, [refresh]);

  // 조직 목록 출력하면 div display정보가 바뀌어야하기 때문에 그 상태 저장
  const [orgaDisplay, setOrgaDisplay] = useState("none");

  // 사원의 조직 목록 정보에서 "추가버튼"에서 회사 정보 출력 TODO redux
  const handleOnClickOrgaRegister = () => {
    const selectEmpNo = empInformation.empNo;
    setOrgaDisplay("block");
    setOrgaChange({ ...orgaChange, empNo: selectEmpNo });
    companyList().then((data) => {
      setCompany(data);
    });
  };

  const [department, setDepartment] = useState([]);
  // 선택한 회사의 목록 정보 출력 TODO redux
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
    empOrgaRegister(orgaChange).then(() => {
    });
  };

  const handleOnClickOrgaRegisterReset = () => {
    setOrgaDisplay("none");
  };

  // 수정할 때, 회사에 맞는 부서 불러오기 (Click아니고 MouseDown으로 함)
  const handleOnClickOrgaModifyDept = (companyNo) => {
    deptList(companyNo).then((data) => {
      setDepartment(data);
    });
  };

  // 조직 정보 수정 input change 이벤트
  const handleOnChangeOrgaInput = (e, targetOrga) => {
    const { type, value, name, checked } = e.target;

    const replaceName = name.replace(/[0-9]/g, "");

    // 라디오 버튼은 name 값이 고유하기때문에 구분하기위한 name 의 숫자를 잘라 넣는다.
    if (type === "radio") {
      targetOrga[replaceName] = value;
    } else {
      targetOrga[name] = value;
    }

    setOrgaModifyNo(targetOrga.orgaNo);

    console.log(targetOrga);
    console.log(orga);
    setOrga([...orga]);
  };

  // 조직 정보 수정 버튼 클릭
  const handleOnClickOrgaModify = () => {
    console.log("clickOrga", orga);
    empOrgaModify(orga).then(() => {
      Swal.fire("수정 완료", "조직 정보가 변경되었습니다.", "success").then();
    });
  };

  return (
    <ModuleInnerWrapper>
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>사원 관리</ModuleInnerTitle>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <EmpInformation
          emps={emps}
          empInformation={empInformation}
          clickEmpRegister={clickEmpRegister}
          changeEmpInput={changeEmpInput}
          clickEmpModify={clickEmpModify}
          clickEmp={clickEmp}
          clickOrga={clickOrga}
          view={view}
          basicColor={basicColor}
          orgaColor={orgaColor}
          orga={orga}
          handleOnClickOrgaRegister={handleOnClickOrgaRegister}
          orgaDisplay={orgaDisplay}
          company={company}
          handleOnChangeCompany={handleOnChangeCompany}
          department={department}
          handleOnClickOrgaRegisterSubmit={handleOnClickOrgaRegisterSubmit}
          handleOnClickOrgaRegisterReset={handleOnClickOrgaRegisterReset}
          handleOnChangeOrgaRegisterInput={handleOnChangeOrgaRegisterInput}
          handleOnClickOrgaModify={handleOnClickOrgaModify}
          handleOnChangeOrgaInput={handleOnChangeOrgaInput}
          handleOnClickOrgaModifyDept={handleOnClickOrgaModifyDept}
          setRefresh={setRefresh}
          refresh={refresh}
        />
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>
  );
}

export default Index;
