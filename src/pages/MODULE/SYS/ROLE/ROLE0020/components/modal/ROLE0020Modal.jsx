import React, { useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { CenterGrid, Divider } from "@components/Grid";
import styled, { css } from "styled-components";
import CommonTreeContainer from "@pages/MODULE/SYS/ROLE/ROLE0020/pages/tree/CommonTreeContainer";
import UserListContent2 from "@pages/MODULE/SYS/ROLE/ROLE0020/components/UserContent2";
import Button from "@components/Button";
import { getOrgaList } from "../../api/OrgaTree";

const initOrgaSearchCondition = {
  option: "emp",
  keyword: "",
  recursive: false,
  orgaNo: 0,
};


const ROLE0020Modal = ({ menuname, companyNo, roleUlSearch, changeOrgaList }) => {
  const [orgas, setOrgas] = useState([]);
  const [orgaSearch, setOrgaSearch] = useState(initOrgaSearchCondition);

  const { closeModal } = useModal();

  const handleCloseModal = () => {
    setOrgaSearch(initOrgaSearchCondition);
    closeModal();
  };

  const changeOrgaSearchConditionHandler = (e) => {
    const { target } = e;
    const { name, value } = target;
    orgaSearch[name] = name === "recursive" ? target.checked : value;
    setOrgaSearch({ ...orgaSearch });
  };

  const orgaSearchSubmitClickHandler = () => {
    const elements = document.querySelectorAll(".contentContainer.orgaList .contentRow:not(.header)");
    const arr = Array.prototype.filter.call(elements, (element) => {
      return element.querySelector("input[type='checkbox']:checked");
    }).map((element) => {
      return element.dataset?.orgaNo;
    });

    changeOrgaList(arr, roleUlSearch);
    closeModal();
  };

  const userListClickHandler = (e) => {
    e.stopPropagation();

    let { target } = e;

    while (!target.classList.contains("contentRow")) {
      target = target.parentElement;
    }

    const checkbox = target.querySelector("input[type='checkbox']");

    if (target.classList.contains("active")) {
      target.classList.remove("active");
      checkbox.checked = false;
    } else {
      target.classList.add("active");
      checkbox.checked = true;
    }
  };

  const searchOrgaList = () => {
    if (orgaSearch.orgaNo === 0) return;
    getOrgaList(orgaSearch).then((result) => {
      setOrgas(result);
    });
  };

  const changeTarget = (currentTarget) => {
    if (currentTarget === 0) return;
    orgaSearch.orgaNo = currentTarget;

    setOrgaSearch({ ...orgaSearch });
    searchOrgaList();
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title={menuname}
    >
      <CenterGrid>
        <OuterDivider span="12">
          <InnerGridWrapper className="orgaSearchCondition">
            <InnerDivider gCol="2" gRow="2">
              <SearchOrderConditionSelect className="orgaSearchOption" name="option" onChange={changeOrgaSearchConditionHandler} width="100%" height="100%" border="1px solid #e6e6e6">
                <option value="emp">사원명(ID)</option>
                <option value="dept">부서명</option>
              </SearchOrderConditionSelect>
            </InnerDivider>
            <InnerDivider gCol="7" gRow="2">
              <input type="text" className="orgaSearchKeyword" name="keyword" value={orgaSearch.keyword} onChange={changeOrgaSearchConditionHandler} style={{ width: "100%", height: "100%", border: "1px solid #e6e6e6", paddingLeft: "10px", boxSizing: "border-box" }} placeholder="검색어를 입력하세요." />
            </InnerDivider>
            <InnerDivider gCol="3" gRow="2">
              <span>
                <input type="checkbox" name="recursive" className="orgaSearchRecursive" onChange={changeOrgaSearchConditionHandler} style={{ verticalAlign: "-2px" }} />
                <span style={{ margin: "0 10px 0 5px" }}>하위부서 사용자 전체</span>
              </span>
              <button type="button" className="btn searchBtn" onClick={searchOrgaList}>🔍</button>
            </InnerDivider>
          </InnerGridWrapper>
        </OuterDivider>
        <OuterDivider span="12">
          <InnerGridWrapper>
            <InnerDivider gCol="4" gRow="2">
              <CommonTreeContainer deptNo="0" depth="0" companyNo={companyNo} changeTarget={changeTarget} />
            </InnerDivider>
            <InnerDivider gCol="8" gRow="2">
              <div className="contentContainer orgaList" style={{ height: "100%", overflowX: "scroll" }}>
                <div className="contentRow contentRow2 header" style={{ width: "120%", gridTemplateColumns: "4% 29% 24% 19% 24%" }}>
                  <div><input type="checkbox" className="orgaCheckAll" /></div>
                  <div><span>회사명</span></div>
                  <div><span>부서명</span></div>
                  <div><span>직급</span></div>
                  <div><span>이름(ID)</span></div>
                </div>
                <div className="innerContentContainer" style={{ width: "120%" }}>
                  {orgas?.map(({
                    orgaNo,
                    companyName,
                    deptName,
                    empRank,
                    empName,
                    username,
                  }) => (
                    <UserListContent2
                      className="contentRow contentRow2"
                      key={orgaNo}
                      orgaNo={orgaNo}
                      companyName={companyName}
                      deptName={deptName}
                      empRank={empRank}
                      empName={empName}
                      username={username}
                      userListClickHandler={userListClickHandler}
                      displayCheckbox
                      template={document.querySelector(".contentRow2.header").style.gridTemplateColumns}
                    />
                  ))}
                </div>
              </div>
            </InnerDivider>
            {/* <InnerDivider gCol="8" gRow="1"> */}
            {/*   선택된 사용자 목록 */}
            {/* </InnerDivider> */}
          </InnerGridWrapper>
        </OuterDivider>
        <OuterDivider span="12">
          <InnerGridWrapper>
            <InnerDivider gCol="12" gRow="2">
              <Button type="button" className="btn searchBtn orgaSearchSubmit" onClick={orgaSearchSubmitClickHandler}>확인</Button>
            </InnerDivider>
          </InnerGridWrapper>
        </OuterDivider>
      </CenterGrid>
    </Modal>
  );
};

export default ROLE0020Modal;

export const GCol = ({ gCol }) => css`
  grid-column: span ${gCol};
`;

export const GRow = ({ gRow }) => css`
  grid-row: span ${gRow};
`;

export const OuterDivider = styled(Divider)`
  ${() => {
    return css`
      width: 50vw;
    `;
  }}
  &:nth-of-type(2){
    min-height: 50vh;
    max-height: 50vh;
    height: 50vh;
  }
  &:last-of-type{
    text-align: center;
  }
  & div{
    box-sizing: border-box;
  }
`;

export const InnerDivider = styled.div`
  ${GCol}
  ${GRow}
  height: 100%;
  min-height: 100%;
`;

// export const InnerGridWrapper = styled.div.attrs((/* props */) => {})`
export const InnerGridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(2, 1fr);
  //margin-top: 1em;
  margin-bottom: 1em;
  //padding-top: 1em;
  &:not(.orgaSearchCondition){
    height: 100%;
  }
  &.orgaSearchCondition{
    padding: 10px;
    border: 2px solid #e6e6e6;
  }
  &.orgaSearchCondition>:not(:nth-child(1)){
    padding-left: 10px;
    text-align: right;
  }
`;

export const SearchOrderConditionSelect = styled.select`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: ${(props) => props.border};
`;
