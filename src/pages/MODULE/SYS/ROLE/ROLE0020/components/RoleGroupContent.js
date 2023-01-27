import React from "react";

const RoleGroupContent = ({
  className,
  roleGroupNo,
  roleGroupClickHandler,
  companyName,
  orgaNo,
  roleGroupName,
  displayChekcbox,
}) => (
  <div className={className} key={roleGroupNo} onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true" data-orga-no={orgaNo} data-role-group-no={roleGroupNo}>
    <input type="checkbox" style={{ display: displayChekcbox }} />
    <div>
      <span onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true">{companyName}</span>
      <span onClick={(e) => { roleGroupClickHandler(e, orgaNo, roleGroupNo); }} aria-hidden="true">{roleGroupName}</span>
    </div>
  </div>
);

export default RoleGroupContent;
