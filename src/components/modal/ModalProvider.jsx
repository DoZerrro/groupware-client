import React, { createContext, useState } from "react";

export const ModalStateContext = createContext();
export const ModalSetterContext = createContext();


/**
 * 모달 Provider 입니다.
 * Provider를 감싼 컴포넌트 내에서
 * 전역적으로 모달을 사용할 수 있습니다.
 *
 * @param children
 * @return {JSX.Element}
 * @constructor
 * @author 김민준
 */
const ModalProvider = ({ children }) => {
  const [state, setState] = useState({
    type: null, title: null,
  });

  return (
    <ModalSetterContext.Provider value={setState}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
};

export default ModalProvider;
