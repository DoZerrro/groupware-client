import styled, { css } from "styled-components";


export const MenuTreeWrapper = styled.div`
  ${() => css`
    padding: 0.5rem;
  `}
`;

export const MenuItemWrapper = styled.div`
  ${({ depth }) => css`
    padding-left: ${depth / 2.5}rem;

  `}
`;

export const MenuItem = styled.div`
  ${() => css`
    display: flex;
  `}
`;

export const IconWrapper = styled.div`
  ${() => css`
    width: 1.5rem;
  `}
`;

export const Icon = styled.img`
  ${() => css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;

export const MenuName = styled.div`
  ${({ theme }) => css`
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;


export const CollapseButton = styled.button`
  ${({ theme, depth }) => css`
    height: 100%;
    display: flex;
    align-items: center;
  `}
`;

export const Wrapper = styled.div`
  ${({}) => css`
    display: flex;
  `}
`;
