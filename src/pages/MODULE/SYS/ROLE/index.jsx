import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Index = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/SYS/ROLE/ROLE0030");
  }, []);

  return (
    <></>
  );
};

export default Index;
