import React, { useContext } from "react";
import { CenterGrid, Divider } from "@components/Grid";
import { InnerWrapper, Wrapper } from "@pages/MODULE/SYS";

const Unselected = () => {
  return (
    <Wrapper>
      <InnerWrapper>
        메뉴를 선택하세요
      </InnerWrapper>
    </Wrapper>
  );
};

export default Unselected;
