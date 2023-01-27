import React from "react";

const UserContent = ({
  className, orgaNo, orgaInfo, empRank, empName, username, onclickHandler,
}) => {
  return (
    <div key={orgaNo} className={className} data-orga-no={orgaNo} onClick={onclickHandler} aria-hidden="true">
      <div><input type="checkbox" /></div>
      <div><span>{orgaInfo}</span></div>
      <div><span>{empRank}</span></div>
      <div><span>{empName}{username ? `(${username})` : ""}</span></div>
    </div>
  );
};

export default UserContent;
