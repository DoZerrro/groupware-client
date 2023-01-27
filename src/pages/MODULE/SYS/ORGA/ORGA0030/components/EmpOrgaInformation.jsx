import React from "react";
import {
  EmpInformationBtn,
  EmpInformationBtnWrapper,
  EmpInformationWrapper,
  EmpOrgaInformationBody,
  EmpOrgaInformationDiv,
  EmpOrgaInformationHeader,
  EmpOrgaInformationInput,
  EmpOrgaInformationRadio,
  EmpOrgaInformationRadioWrapper,
  EmpOrgaInformationSelect,
  EmpOrgaInformationWrapper, Option,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";

import useModal from "@hooks/useModal";

function EmpOrgaInformation({
  orga,
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
}) {
  const { openModal } = useModal();

  const data = {
    orga,
  };

  const handleOnRegisterOrgaModal = () => {
    openModal({ type: "RegisterOrga", props: data });
  };

  return (
    <EmpInformationWrapper>
      <EmpInformationBtnWrapper>
        <EmpInformationBtn type="button" onClick={() => { handleOnRegisterOrgaModal(); }}>추가</EmpInformationBtn>
        <EmpInformationBtn type="button" onClick={() => { handleOnClickOrgaModify(); }}>수정</EmpInformationBtn>
      </EmpInformationBtnWrapper>

      <div style={{ display: orgaDisplay }}>
        <form>
          <div>
            회사 :
            <select name="companyNo" onChange={(e) => { handleOnChangeCompany(e); }}>
              <option value="0" key="-">--회사 선택--</option>
              {company.map((com) => (
                <option key={com.companyNo} value={com.companyNo}>{com.companyName}</option>
              ))}
            </select>
          </div>

          <div>
            부서 :
            <select name="deptNo" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }}>
              <option value="0" key="-">--부서 선택--</option>
              {department.map((dept) => (
                <option key={dept.deptNo} value={dept.deptNo}>{dept.deptName}</option>
              ))}
            </select>
          </div>

          <div>
            직급 :
            <select name="empRank" onChange={(e) => { handleOnChangeOrgaRegisterInput(e); }}>
              <option value="-">--직급 선택--</option>
              <option value="회장" key="회장">회장</option>
              <option value="사장" key="사장">사장</option>
              <option value="이사" key="이사">이사</option>
              <option value="부장" key="부장">부장</option>
              <option value="과장" key="과장">과장</option>
              <option value="대리" key="대리">대리</option>
              <option value="주임" key="주임">주임</option>
              <option value="사원" key="사원">사원</option>
              <option value="인턴" key="인턴">인턴</option>
              <option value="일용직" key="일용직">일용직</option>
            </select>
          </div>

          <button type="submit" onClick={() => { handleOnClickOrgaRegisterSubmit(); }}>추가하기</button>
          <button type="button" onClick={() => { handleOnClickOrgaRegisterReset(); }}>취소하기</button>
        </form>
      </div>

      <EmpOrgaInformationWrapper>
        {orga?.map((target) => {
          const {
            companyName,
            deptName,
            empRank,
            hiredDate,
            retiredDate,
            companyTel,
            companyAddress,
            orgaNo,
            deptMain,
            // empRole,
            companyNo,
            deptNo,
          } = target;

          return (
            <EmpOrgaInformationDiv key={orgaNo}>
              <EmpOrgaInformationHeader>회사/부서</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationInput className="unchangeable" not value={companyName} readOnly />
                <EmpOrgaInformationSelect
                  name="deptNo"
                  onMouseDown={() => { handleOnClickOrgaModifyDept(companyNo); }}
                  onChange={(e) => { handleOnChangeOrgaInput(e, target); }}
                >
                  <Option value={deptNo}>{deptName}</Option>
                  {department?.map((dept) => (
                    <Option key={dept.deptNo} value={dept.deptNo}>{dept.deptName}</Option>
                  ))}
                </EmpOrgaInformationSelect>
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>사번</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationInput className="unchangeable" value={orgaNo} readOnly />
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>부서구분</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationRadioWrapper className="unchangeable">
                  <EmpOrgaInformationRadio name={`deptMain${orgaNo}`} type="radio" value="true" checked={deptMain === true} readOnly />주부서
                  <EmpOrgaInformationRadio name={`deptMain${orgaNo}`} type="radio" value="false" checked={deptMain === false} readOnly />부부서
                </EmpOrgaInformationRadioWrapper>
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>직급</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationSelect className="essential" name="empRank" onChange={(e) => { handleOnChangeOrgaInput(e, target); }}>
                  <Option value={empRank}>{empRank}</Option>
                  <Option value="회장" key="회장">회장</Option>
                  <Option value="사장" key="사장">사장</Option>
                  <Option value="이사" key="이사">이사</Option>
                  <Option value="부장" key="부장">부장</Option>
                  <Option value="과장" key="과장">과장</Option>
                  <Option value="대리" key="대리">대리</Option>
                  <Option value="주임" key="주임">주임</Option>
                  <Option value="사원" key="사원">사원</Option>
                  <Option value="인턴" key="인턴">인턴</Option>
                  <Option value="일용직" key="일용직">일용직</Option>
                </EmpOrgaInformationSelect>
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>입사일</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody span="1">
                <EmpOrgaInformationInput className="unchangeable" type="date" value={hiredDate} readOnly />
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>퇴사일</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody span="1">
                <EmpOrgaInformationInput
                  type="date"
                  value={retiredDate === null ? "" : retiredDate}
                  name="retiredDate"
                  onChange={(e) => { handleOnChangeOrgaInput(e, target); }}
                />
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>회사 전화번호</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationInput value={companyTel} readOnly className="unchangeable" />
              </EmpOrgaInformationBody>

              <EmpOrgaInformationHeader>회사 주소</EmpOrgaInformationHeader>
              <EmpOrgaInformationBody>
                <EmpOrgaInformationInput value={companyAddress} readOnly className="unchangeable" />
              </EmpOrgaInformationBody>
            </EmpOrgaInformationDiv>
          );
        })}
      </EmpOrgaInformationWrapper>
    </EmpInformationWrapper>
  );
}

export default EmpOrgaInformation;
