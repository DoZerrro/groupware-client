import React from "react";
import styled, { css } from "styled-components";


const Arrow = ({ color, size, isOpen }) => {
  return (
    <SvgWrapper
      width="100"
      height="100"
      viewBox="0 0 50 50"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      isOpen={isOpen}
      color={color}
    >
      <path d="M31 36L19 24L31 12" stroke="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </SvgWrapper>
  );
};

const SvgWrapper = styled.svg`
  ${({ size, isOpen, theme, color }) => {
    return css`
      width: ${size};
      height: ${size};
      rotate:${isOpen ? "-90deg" : "180deg"};
      path{
        stroke: ${color || theme.color.black};
      }
    `;
  }}
`;


export default Arrow;
