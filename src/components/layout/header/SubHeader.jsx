import React from "react";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { applicationSelector, SET_LNBSIDEBAR } from "@reducer/applicationSlice";
import Hamburger from "@styles/assets/icon/Hamburger";
import { darken } from "polished";


/**
 * GNB 메뉴 이름을 표시하는 헤더입니다.
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const SubHeader = () => {
  const application = useSelector(applicationSelector);
  const dispatch = useDispatch();

  const handleOnSidebar = () => {
    dispatch(SET_LNBSIDEBAR(!application.lnbSidebar));
  };

  return (
    <SubHeaderWrapper application={application}>
      <ItemWrapper>
        <IconWrapper onClick={handleOnSidebar}>
          <Hamburger size="25px" />
        </IconWrapper>
        <TitleWrapper>
          {application.title}
        </TitleWrapper>
      </ItemWrapper>
    </SubHeaderWrapper>
  );
};

const SubHeaderWrapper = styled.div`
  ${({ theme, application }) => css`
    background-color: ${theme.color.douzoneBlue};
    color: ${theme.color.white};
    display: ${application.subHeader ? "border-box" : "none"};
  `}
`;

const ItemWrapper = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    height: 100%;
  `}
`;

const TitleWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.typo.heading2};
    margin-left: 1rem;
  `}
`;

const IconWrapper = styled.div`
  ${({ theme }) => css`
    padding: 10px;
    background-color: ${darken(0.1, theme.color.douzoneBlue)};
  `}
`;

export default SubHeader;
