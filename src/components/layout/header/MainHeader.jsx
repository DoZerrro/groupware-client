import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import useModal from "@hooks/useModal";
import { removeCookie } from "@utils/cookieUtil";
import { ACCESS_TOKEN, API_URL, REFRESH_TOKEN } from "@constants/common";
import Logo from "@styles/assets/icon/logo.svg";
import Orga from "@styles/assets/icon/orga.png";
import Logout from "@styles/assets/icon/logout.svg";


import axios from "axios";
import { GET_LOGIN_USER_INFORMATION } from "@api/commonApi";
import Swal from "sweetalert2";
import { getFavoriteEmpList, getMygroupList } from "@pages/MODULE/SYS/ORGA/ORGA0010/api/mygroup";

/**
 * 어플리케이션 메인 아이콘과, 로그인 정보를 표시하는 헤더입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const MainHeader = () => {
  const { openModal } = useModal();
  const [userInformation, setUserInformation] = useState();
  const handleOnChangeCompanyModal = () => {
    openModal({
      type: "ORGA0030",
      props: "",
    });
  };
  const handleOnOrganizationChartModal = () => {
    openModal({
      type: "ORGA0010",
      props: "",
    });
  };
  const history = useHistory();

  const handleLogout = () => {
    Swal.fire({
      title: "로그아웃",
      text: "로그아웃 하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "로그아웃",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.get(`${API_URL}/logout`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`,
          },
        }).then(() => {
          sessionStorage.clear();
          removeCookie(REFRESH_TOKEN);
          history.push("/");
          location.reload();
        });
      }
    });
  };


  useEffect(() => {
    GET_LOGIN_USER_INFORMATION().then((res) => {
      setUserInformation(res.data[0]);
    });
  }, []);

  return (
    <MainHeaderWrapper>
      <LogoWrapper onClick={() => {
        history.push("/");
      }}
      >
        <img src={Logo} alt="Logo" />
      </LogoWrapper>
      <UserInformationWrapper>
        <ProfileWrapper onClick={handleOnChangeCompanyModal}>
          <ProfileImage src={userInformation?.profileUrl} />
          <ProfileInformation>
            <EmpName>{userInformation?.empName}</EmpName>
            <EmpInfo>{userInformation?.companyList[0].companyName} {userInformation?.companyList[0].deptList[0].deptName}</EmpInfo>
          </ProfileInformation>
        </ProfileWrapper>
        <OrgaImage src={Orga} onClick={handleOnOrganizationChartModal} />
        <LogoutImage src={Logout} onClick={handleLogout} />
      </UserInformationWrapper>
    </MainHeaderWrapper>
  );
};

const LogoutImage = styled.img`
  ${({}) => css`
    margin-left: 5px;
    rotate: 0.1deg;
    width: 1.5rem;
  `}
`;

const EmpName = styled.div`
  ${({ theme }) => css`
    color: ${theme.color.gray900};
    font-size: 0.8rem;
  `}
`;

const EmpInfo = styled.div`
  ${({ theme }) => css`
    color: ${theme.color.gray700};
    font-size: 0.7rem;
    letter-spacing: -0.2px;
  `}
`;

const ProfileInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  margin-right: 40px;
`;

const MainHeaderWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${theme.color.white};
    height: 50px;
    margin: 0 10px;
  `}
`;

const OrgaImage = styled.img`
  width: 2.1rem;
`;

const LogoWrapper = styled.div`
  ${() => css`
    width: 8%;
  `}

`;

const UserInformationWrapper = styled.div`
  ${() => css`
    display: flex;
    height: 70%;
  `}
`;

const ProfileImage = styled.img`
  border-radius: 100%;
`;

const ProfileWrapper = styled.div`
  display: flex;
`;

export default MainHeader;
