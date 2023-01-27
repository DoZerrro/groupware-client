import React from "react";
import styled, { css } from "styled-components";


const Hamburger = ({ size }) => {
  return (
    <SvgWrapper
      width="300"
      height="300"
      viewBox="0 0 300 300"
      preserveAspectRatio="xMidYMid meet"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
    >
      <rect width="300" height="50" y="50" />
      <rect width="300" height="50" y="150" />
      <rect width="300" height="50" y="250" />
    </SvgWrapper>
  );
};

const SvgWrapper = styled.svg`
  ${({ size }) => {
    return css`
      width: ${size};
      height: ${size};
    `;
  }}
`;


export default Hamburger;
