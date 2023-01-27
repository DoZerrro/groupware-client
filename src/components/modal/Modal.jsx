import React, { useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import { darken } from "polished";
import Cross from "@styles/assets/icon/Cross";
import { BreakLine } from "@components/Util";


/**
 * 모달 컴포넌트 입니다.
 *
 * @return {}
 * @constructor
 * @author 김민준
 */
const Modal = ({
  onClose,
  children,
  title,
}) => {
  const handleClose = () => {
    onClose?.();
  };


  useEffect(() => {
    const $body = document.querySelector("body");
    const { overflow } = $body.style;
    $body.style.overflow = "hidden";
    return () => {
      $body.style.overflow = overflow;
    };
  }, []);
  return (
    <Layout>
      <ModalWrapper>
        <TitleWrapper>
          {title || ""}
          <CloseButton onClick={handleClose}><IconWrapper><Cross /></IconWrapper></CloseButton>
        </TitleWrapper>
        <BreakLine />
        <ContentWrapper>
          {children}
        </ContentWrapper>
      </ModalWrapper>
    </Layout>
  );
};

const modalAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Layout = styled.div`
  ${() => {
    return css`
      position: fixed;
      display: grid;
      width: 100vw;
      height: 100vh;
      align-content: center;
      justify-content: center;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 999;
      animation: ${modalAnimation} 0.2s;
    `;
  }}
`;

const TitleWrapper = styled.div`
  ${({ theme }) => {
    return css`
      ${theme.typo.heading2()}
      display: flex;
      justify-content: space-between;
      color: ${theme.color.gray900};
      align-items: center;
    `;
  }}
`;

const ModalWrapper = styled.div`
  ${({ theme }) => {
    return css`
      padding: 20px;
      min-width: 500px;
      height: fit-content;
      background-color: ${theme.color.white};
      border: 1px solid ${darken(0.1, theme.color.white)};
    `;
  }}
`;

const CloseButton = styled.div`
  ${() => {
    return css`

    `;
  }}
`;

const IconWrapper = styled.div`
  ${({ theme }) => {
    return css`
      width: 50%;
    `;
  }}
`;

const ContentWrapper = styled.div`
  ${() => {
    return css`
    `;
  }}
`;

export default Modal;
