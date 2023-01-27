import React, { useEffect, useState } from "react";
import { empInfo, registerLoginUser } from "@pages/auth/Profile/api/profile";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import {
  ProfileAccessInformation, ProfileBody, ProfileBodySelect,
  ProfileButton,
  ProfileButtonWrapper,
  ProfileCheckWrapper,
  ProfileExplain,
  ProfileFullLayout, ProfileHeader,
  ProfileImg,
  ProfileInformationWrapper,
  ProfileName,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import { FullLayout } from "@components/Util";
import { CenterGrid } from "@components/Grid";

const Index = () => {
  const history = useHistory();
  const initState = {
    loginCompanyNo: 0,
    loginDeptNo: 0,
  };

  const [employeeState, setEmployeeState] = useState([]);
  const [selectLogin, setSelectLogin] = useState(initState);

  // 새로 고침 막기
  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // Chrome에서 동작하도록; deprecated
    Swal.fire("", "회사 선택 후 확인 버튼을 눌러주세요.", "warning").then(
      () => {
        history.push("/profile");
      },
    );
  };

  // 회사, 부서 set
  useEffect(() => {
    empInfo()
      .then((data) => {
        setEmployeeState(data);
      });
  }, []);

  useEffect(() => {
    // 새로 고침 막기
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();

    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  // 회사 변경 확인 클릭 버튼
  const handleOnClickChangeDeptSubmit = () => {
    // radio 타입의 result 가 들어갈 새로운 배열 생성
    const radioArr = [];

    let radio = "";
    let select = "";
    // 클래스 companyDiv 내의 모든 요소를 가져온다.
    const companyDivs = document.querySelectorAll(".companyDiv");
    // 유사 배열
    // 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환
    // 가져온 요소들을 각 각 새로운 배열로 만들어 반환한다.
    Array.prototype.map.call(companyDivs, (companyDiv) => {
      // 타입이 라디오인 요소 선택
      radio = companyDiv.querySelector("input[type='radio']");
      // 타입이 셀렉인 요소 선택
      select = companyDiv.querySelector("select");

      // 선택된 radio 타입이 있다면, 값을 넣기 위한 배열에 선택된 값을 넣는다.
      if (radio.checked === true) {
        radioArr.push(radio.value);
        radioArr.push(select.value);
      }
    });

    // 배열이 비어있다면 체크 여부 알람을 띄운다.
    if (radioArr.length === 0) {
      Swal.fire("체크 여부 없음", "접속할 회사를 선택해주세요", "warning").then();
      // 배열의 값이 있다면, 배열의 0번째 값 ( 체크 값 ), 1번째 값을 각각 해당하는 state 로 설정한다.
    } else {
      selectLogin.loginCompanyNo = Number(radioArr[0]);
      selectLogin.loginDeptNo = Number(radioArr[1]);
      setSelectLogin({ ...selectLogin });
      registerLoginUser(selectLogin)
        .then(() => {
          history.push("/");
          location.reload();
        });
    }
  };

  return (
    <FullLayout>
      <CenterGrid columns="1">
        <ProfileInformationWrapper>
          {employeeState.map((info) => {
            return (
              <div key={info.empNo}>
                <div>{info.profileUrl
                  ? <ProfileImg src={info.profileUrl} alt="프로필 이미지" style={{ width: "100px" }} />
                  : <div /> }
                </div>
                <ProfileName>{info.empName}</ProfileName>
                <ProfileAccessInformation>
                  최근 접속: {info.lastLoginIp} | {info.lastLoginTime} (현재: {info.loginIp})
                </ProfileAccessInformation>


                <ProfileExplain>＊회사를 선택해주세요.</ProfileExplain>
                <ProfileHeader>
                  회사명
                </ProfileHeader>
                <ProfileHeader>
                  부서명
                </ProfileHeader>
                {info.companyList.map((company) => {
                  return (
                    <ProfileCheckWrapper>
                      <div key={company.companyNo} className="companyDiv">
                        <ProfileBody>
                          <input
                            name="loginCompanyNo"
                            type="radio"
                            value={company.companyNo}
                            readOnly
                          />
                          {company.companyName}
                        </ProfileBody>
                        <ProfileBody>
                          <ProfileBodySelect name="dept">
                            {company.deptList.map((dept) => {
                              return (
                                <option key={dept.deptNo} value={dept.deptNo} name="loginDeptNo">
                                  {dept.deptName}
                                </option>
                              );
                            })}
                          </ProfileBodySelect>
                        </ProfileBody>
                      </div>
                    </ProfileCheckWrapper>
                  );
                })}

              </div>
            );
          })}
          <ProfileButtonWrapper>
            <ProfileButton
              type="submit"
              onClick={() => {
                handleOnClickChangeDeptSubmit();
              }}
            >확인
            </ProfileButton>
          </ProfileButtonWrapper>
        </ProfileInformationWrapper>
      </CenterGrid>
    </FullLayout>
  );
};

export default Index;
