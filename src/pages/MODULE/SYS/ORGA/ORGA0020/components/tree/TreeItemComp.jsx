import React, { useEffect, useRef, useState } from "react";
import { getTree } from "@pages/MODULE/SYS/ORGA/ORGA0020/api/department";
import styled, { css } from "styled-components";

function TreeItemComp({ topDepartment, clickDept, clickDeptShow }) {
  /**
   * 조직도에서 1depth밑의 부서들의 상태를 관리합니다.
   */
  const [department, setDepartment] = useState([]);
  /**
   * 조직도에서 조직도를 열고 닫고 할 때 사용하는 아이콘을 관리합니다.
   */
  const [icon, setIcon] = useState("+");


  /**
   * HTML 태그 선택자
   * @type {React.MutableRefObject<undefined>}
   */
  const buttonRef = useRef();

  /**
   * 클릭을 할 때 마다, 하위 부서가 있는지 탐색합니다.
   * @param companyNo
   * @param depth
   * @param upperDeptNo
   */
  const findUnderDepartment = (companyNo, depth, upperDeptNo) => {
    getTree(companyNo, depth, upperDeptNo).then((result) => {
      setDepartment(result);
      setIcon("-");
    });
  };

  /**
   * 메뉴를 폴딩하는 버튼입니다.
   * @param companyNo
   * @param depth
   * @param upperDeptNo
   */
  const foldingButton = (companyNo, depth, upperDeptNo) => {
    if (icon === "-") {
      setDepartment([]);
      setIcon("+");
    } else if (icon === "+") {
      findUnderDepartment(companyNo, depth, upperDeptNo);
    }
  };

  if (!topDepartment) {
    return (<></>);
  }

  return (
    <div>
      <ul>
        {topDepartment.map((item) => (
          <List key={item.deptNo}>
            <Department>
              <button
                type="button"
                ref={buttonRef}
                onClick={() => foldingButton(item.companyNo, item.depth + 1, item.deptNo)}
              >{icon}
              </button>
              <span
                onClick={() => { clickDept(item.companyNo, item.deptNo); }}
              >{item.deptNo} -- {item.deptName}
              </span>
            </Department>
            {department ? department.map((childrenItem) => (
              <TreeItemComp
                key={childrenItem.deptNo}
                topDepartment={[childrenItem]}
                clickDept={clickDept}
              />
            )) : <div /> }
          </List>
        ))}
      </ul>
    </div>
  );
}

const List = styled.li`
  ${({}) => {
  return css`
      padding: 0.3rem;
      border-bottom: 0.5px solid #666666;
    `;
}}
`;

const Department = styled.div`
  ${({}) => {
  return css`
      padding: 0.3rem;
    `;
}}
`;

export default TreeItemComp;
