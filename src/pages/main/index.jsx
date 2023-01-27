import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applicationSelector, SET_LNBSIDEBAR, SET_SUBHEADER, SET_TITLE } from "@reducer/applicationSlice";
import MainCover from "@styles/assets/icon/bg.jpg";
import styled, { css } from "styled-components";
import Aquaranth from "@styles/assets/icon/Aquaranth";


const Index = () => {
  const dispatch = useDispatch();
  const application = useSelector(applicationSelector);

  useEffect(() => {
    if (application.subHeader === true) {
      dispatch(SET_SUBHEADER(false));
    }

    if (application.lnbSidebar === true) {
      dispatch(SET_LNBSIDEBAR(false));
    }
    return (() => {
      dispatch(SET_SUBHEADER(true));
      dispatch(SET_LNBSIDEBAR(true));
      dispatch(SET_TITLE(""));
    });
  }, []);

  return (
    <MainCoverImage image={MainCover}>
      <Title>Aquaranth 10</Title>
      <Text>기업의 지속가능한 성장을 위해 디지털 혁신을 완성한다.</Text>
    </MainCoverImage>
  );
};

const Title = styled.div`
  ${({theme}) => css`
    ${theme.typo.heading1};
    color:${theme.color.white};
    margin-bottom: 50px;
  `}
`;

const Text = styled.div`
  ${({ theme }) => css`
    ${theme.typo.heading2}
    color:${theme.color.white}
  `}
`;

const MainCoverImage = styled.div`
  ${({ image }) => css`
    display: flex;
    flex-direction: column;
    position: fixed;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    width: 100%;
    height: 100%;
    background-image: url(${image});
    background-size: cover;
  `}
`;

export default Index;
