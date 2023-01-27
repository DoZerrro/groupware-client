import React, { useState } from "react";
import CompanyInformation from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyInformation";
import CompanySearch from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanySearch";
import CompanyList from "@pages/MODULE/SYS/ORGA/ORGA0010/components/company/CompanyList";
import { getCompanyList, getCompanyInformation, registerCompanyInformation,
  ModifyCompanyInformation, RemoveCompanyInformation } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/company";
import Swal from "sweetalert2";
import {
  CompanyManagementDiv,
  CompanyListInfoDiv,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";


// 회사 기본정보 초기값
const initState = {
  companyNo: 0,
  companyName: "",
  companyAddress: "",
  companyTel: "",
  ownerName: "",
  businessNumber: "",
  foundingDate: "",
  companyUse: true,
};

// 입력된 컬럼을 확인하기 위해 만든 데이터
const initStateName = {
  companyName: "회사명",
  companyAddress: "회사주소",
  companyTel: "대표전화",
  ownerName: "대표자명",
  businessNumber: "사업자번호",
  foundingDate: "설립일",
};


// 회사관리 component
function CompanyManagement({ list, setList }) {
  const [information, setInformation] = useState({}); // 해당 회사 정보를 담을 상태값
  const [show, setShow] = useState(true); // 회사 기본정보 component 화면 출력 상태값

  // 회사 등록 시 예외처리 때 사용
  const checkArr = []; // 빈 문자인 기본정보의 값을 저장할 배열
  const [printName, setPrintName] = useState([]); // 빈 문자인 컬럼명 출력하기 위한 배열
  let checkNum = 0; // 기본정보 안에 빈 문자가 존재하는지 체크하는 숫자


  // 회사 정보 리스트 중 하나를 선택했을 때 해당 회사 정보를 받아올 handler
  const clickCompanyListItem = (e, companyNo) => {
    let { target } = e;
    if (!target.classList.contains("companyListItemDiv")) {
      target = target.parentElement;
    }
    const companyListItemDivs = document.querySelectorAll(".companyListItemDiv");
    companyListItemDivs.forEach((companyListItemDiv) => companyListItemDiv.classList.remove("active"));
    target.classList.add("active");

    getCompanyInformation(companyNo).then((data) => {
      console.log(data);
      setInformation(data);
      setShow(true);
    });
  };

  // 회사 기본정보 화면 출력 off 할 handler
  const clickCompanyInfoShow = () => {
    setShow(false);
  };

  // 회사 기본정보 추가할 component 출력 handler
  const clickCompanyRegister = () => {
    setInformation({ ...initState });
    setShow(true);
  };


  // 회사 기본정보에 빈 문자가 있는지 체크하는 함수
  const isEmpty = () => {
    // 회사 기본정보 객체의 key,value 값으로 배열로 변경([[key, value], ...])
    const infoValueArr = Object.entries(information);
    infoValueArr.forEach((item) => {
      if (item[1] === "") {
        checkNum += 1; // value 값이 빈 문자가 존재할 때마다 +1
        checkArr.push(item[0]); // 빈 문자가 존재하는 item 을 배열에 추가
      }
    });
  };

  // 회사 기본정보를 등록 및 수정할 handler
  const clickCompanySave = () => {
    // 컬럼명이 들어있는 객체의 key,value 값으로 배열로 변경([[key, value], ...])
    const checkName = Object.entries(initStateName);
    isEmpty(); // 추가할 정보에 빈 문자가 있는지 확인
    setPrintName([]);
    checkArr.forEach((name) => {
      checkName.map((item) => {
        if (name === item[0]) {
          printName.push(item[1]);
        }
        return printName;
      });
    });

    if (checkNum === 0) {
      if (information.companyNo === 0) {
        console.log("회사 기본정보 등록");
        registerCompanyInformation(information).then(() => {
          Swal.fire("", "등록이 완료되었습니다.", "success").then(() => {
            getCompanyList().then((data) => {
              setList(data);
              setInformation({});
              setShow(false);
            });
          });
        });
      } else {
        console.log("회사 기본정보 수정");
        ModifyCompanyInformation(information).then(() => {
          Swal.fire("", "수정이 완료되었습니다.", "success").then(() => {
            getCompanyInformation(information.companyNo).then((data) => {
              setInformation(data);
            });
            getCompanyList().then((data) => {
              setList(data);
            });
          });
        });
      }
    } else {
      Swal.fire({
        title: "기본정보 미입력",
        text: `[${printName}]`,
        icon: "error",
      }).then();
    }
  };

  // 회사 기본정보 삭제(사용여부를 '미사용'으로 변경)할 handler
  const clickCompanyRemove = (companyNo, companyUse) => {
    console.log(companyNo);
    console.log(companyUse);
    if (companyUse === true) {
      RemoveCompanyInformation(companyNo).then(() => {
        Swal.fire("", "미사용처리 되었습니다.", "success").then(() => {
          getCompanyInformation(companyNo).then((data) => {
            setInformation(data);
          });
          getCompanyList().then((data) => {
            setList(data);
          });
        });
      });
    } else {
      Swal.fire("", "이미 미사용처리 되었습니다.", "warning").then();
    }
  };

  return (
    <CompanyManagementDiv>
      <CompanySearch setList={setList} />
      <CompanyListInfoDiv>
        <CompanyList
          list={list}
          setList={setList}
          clickCompanyListItem={clickCompanyListItem}
          clickCompanyRegister={clickCompanyRegister}
        />
        <CompanyInformation
          information={information}
          setInformation={setInformation}
          show={show}
          clickCompanyInfoShow={clickCompanyInfoShow}
          clickCompanySave={clickCompanySave}
          clickCompanyRemove={clickCompanyRemove}
        />
      </CompanyListInfoDiv>
    </CompanyManagementDiv>
  );
}

export default CompanyManagement;
