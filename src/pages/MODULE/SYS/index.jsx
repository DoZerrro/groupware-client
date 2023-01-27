import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";

const Index = () => {
  useEffect(() => {
  }, []);
  return (
    <Wrapper>
      <InnerWrapper>
        좌측에 있는 메뉴를 선택해 주세요.
      </InnerWrapper>
    </Wrapper>
  );
};

export const InnerWrapper = styled.div`
  ${({ theme }) => css`
    ${theme.typo.heading1}
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${theme.color.gray500}
  `}
`;

export const Wrapper = styled.div`
  ${({}) => css`
    padding: 20px;
    width: 100%;
    height: 100%;
  `}
`;

export default Index;
