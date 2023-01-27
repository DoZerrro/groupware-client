import React, { createContext, useState } from "react";


const SelectMenuContext = createContext();

export const SelectMenuContextProvider = ({ children }) => {
  const [menuList, setMenuList] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState();
  const [queryMenu, setQueryMenu] = useState();

  return (
    <SelectMenuContext.Provider value={{ menuList, selectedMenu, queryMenu, setMenuList, setSelectedMenu, setQueryMenu }}>
      {children}
    </SelectMenuContext.Provider>
  );
};


export default SelectMenuContext;
