import React from "react";
import MenuConfigurationComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/MenuConfigurationComp";
import { SelectMenuContextProvider } from "@pages/MODULE/SYS/ROLE/ROLE0030/context/SelectMenuContext";
import {
  ModuleInnerMainContentWrapper,
  ModuleInnerTitle,
  ModuleInnerTitleWrapper, ModuleInnerWrapper,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

const Index = () => {
  return (
    <ModuleInnerWrapper>
      <ModuleInnerTitleWrapper>
        <ModuleInnerTitle>메뉴사용 설정</ModuleInnerTitle>
      </ModuleInnerTitleWrapper>
      <ModuleInnerMainContentWrapper>
        <SelectMenuContextProvider>
          <MenuConfigurationComp />
        </SelectMenuContextProvider>
      </ModuleInnerMainContentWrapper>
    </ModuleInnerWrapper>

  );
};


export default Index;

