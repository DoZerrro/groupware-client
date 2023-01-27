import React from "react";

const UserContent2 = ({
  className,
  orgaNo,
  companyName,
  deptName,
  empRank,
  empName,
  username,
  userListClickHandler,
  displayCheckbox,
  template,
}) => {
  return (
    <div key={orgaNo} className={className} data-orga-no={orgaNo} onClick={userListClickHandler} style={{ gridTemplateColumns: template }} aria-hidden="true">
      <div onClick={userListClickHandler} aria-hidden="true" style={{ display: `${displayCheckbox ? "" : "none"}` }}><input type="checkbox" onClick={userListClickHandler} aria-hidden="true" /></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{companyName}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{deptName}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{empRank}</span></div>
      <div onClick={userListClickHandler} aria-hidden="true"><span onClick={userListClickHandler} aria-hidden="true">{empName}{username ? `(${username})` : ""}</span></div>
    </div>
  );
};

export default UserContent2;
