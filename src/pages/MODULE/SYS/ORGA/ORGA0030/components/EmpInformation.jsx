import React from "react";
import EmpOrgaInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpOrgaInformation";
import EmpBasicInformation from "@pages/MODULE/SYS/ORGA/ORGA0030/components/EmpBasicInformation";
import useModal from "@hooks/useModal";
import {
  EmpInfoContent,
  EmpInfoPageWrapper,
  EmpInfoTab,
  EmpInfoTabWrapper,
  EmpListDiv,
  EmpListItemDetailDiv,
  EmpListItemDetailInfo,
  EmpListItemDiv,
  EmpListItemImg,
  EmpPageWrapper,
  EmpUseItemDiv,
  GroupCountWrap,
  GroupSection,
  InnerInformationIcon,
  InnerInformationInnerSpan,
  InnerInformationInnerWrapper,
  InnerInformationWrap,
  Span,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

function EmpInformation({
  emps,
  empInformation,
  clickEmpRegister,
  changeEmpInput,
  clickEmpModify,
  clickEmpRemove,
  clickEmp,
  clickOrga,
  view,
  basicColor,
  orgaColor,
  orga,
  handleOnClickOrgaRegister,
  orgaDisplay,
  company,
  handleOnChangeCompany,
  department,
  handleOnClickOrgaRegisterSubmit,
  handleOnClickOrgaRegisterReset,
  handleOnChangeOrgaRegisterInput,
  handleOnClickOrgaModify,
  handleOnChangeOrgaInput,
  handleOnClickOrgaModifyDept,
  setRefresh,
  refresh,
}) {
  const { openModal } = useModal();

  const handleOnRegisterModal = () => {
    openModal({ type: "ORGA0030Register" });
  };

  return (
    <EmpPageWrapper>
      <EmpListDiv width="400px" border="2">
        <GroupSection className="section1" height="50px">
          <GroupCountWrap>
            <Span>사용자 : </Span>
            <Span>{emps.length}</Span>
            <Span>명</Span>
          </GroupCountWrap>
        </GroupSection>

        <GroupSection className="section2" height="calc(100% - 50px)">
          {emps.map(({
            empNo,
            username,
            empName,
            firstHiredDate,
            profileUrl,
            empUse,
          }) => (
            <EmpListItemDiv className="employeeListItemDiv" key={empNo} onClick={(e) => clickEmp(e, empNo)} aria-hidden="true">
              <EmpListItemImg profileUrl={profileUrl} />
              <EmpListItemDetailDiv>
                <EmpListItemDetailInfo>{username}</EmpListItemDetailInfo>
                <EmpListItemDetailInfo className="empName">{empName}</EmpListItemDetailInfo>
              </EmpListItemDetailDiv>
              <EmpListItemDetailDiv>
                <EmpListItemDetailInfo>{firstHiredDate}</EmpListItemDetailInfo>
                <EmpListItemDetailInfo>
                  <EmpUseItemDiv empUse={empUse}>{empUse ? "사용" : "미사용"}</EmpUseItemDiv>
                </EmpListItemDetailInfo>
              </EmpListItemDetailDiv>
            </EmpListItemDiv>
          ))}
        </GroupSection>
      </EmpListDiv>

      <EmpInfoPageWrapper>
        <InnerInformationWrap>
          <InnerInformationIcon>௹</InnerInformationIcon>
          <InnerInformationInnerWrapper>
            <InnerInformationInnerSpan className="double">빨간색은 필수 입력 항목입니다.</InnerInformationInnerSpan>
            <InnerInformationInnerSpan className="double">검정색은 변경 불가 항목입니다.</InnerInformationInnerSpan>
          </InnerInformationInnerWrapper>
        </InnerInformationWrap>
        <EmpInfoTabWrapper>
          <EmpInfoTab color={basicColor} onClick={(e) => clickEmp(e, empInformation.empNo)} aria-hidden="true">기본정보</EmpInfoTab>
          <EmpInfoTab color={orgaColor} onClick={(e) => clickOrga(e, empInformation.empNo)} aria-hidden="true">조직정보</EmpInfoTab>
        </EmpInfoTabWrapper>
        <EmpInfoContent>
          {view ? (
            <EmpBasicInformation
              clickEmpRegister={clickEmpRegister}
              clickEmpModify={clickEmpModify}
              clickEmpRemove={clickEmpRemove}
              empInformation={empInformation}
              changeEmpInput={changeEmpInput}
              handleOnRegisterModal={handleOnRegisterModal}
              setRefresh={setRefresh}
              refresh={refresh}
            />
          ) : (
            <EmpOrgaInformation
              orga={orga}
              handleOnClickOrgaRegister={handleOnClickOrgaRegister}
              orgaDisplay={orgaDisplay}
              company={company}
              handleOnChangeCompany={handleOnChangeCompany}
              department={department}
              handleOnClickOrgaRegisterSubmit={handleOnClickOrgaRegisterSubmit}
              handleOnClickOrgaRegisterReset={handleOnClickOrgaRegisterReset}
              handleOnChangeOrgaRegisterInput={handleOnChangeOrgaRegisterInput}
              handleOnClickOrgaModify={handleOnClickOrgaModify}
              handleOnChangeOrgaInput={handleOnChangeOrgaInput}
              handleOnClickOrgaModifyDept={handleOnClickOrgaModifyDept}
            />
          )}
        </EmpInfoContent>
      </EmpInfoPageWrapper>
    </EmpPageWrapper>
  );
}

export default EmpInformation;
