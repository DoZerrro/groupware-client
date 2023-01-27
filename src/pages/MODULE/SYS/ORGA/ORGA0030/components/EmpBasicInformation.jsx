import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  EmpBasicInformationBody,
  EmpBasicInformationDiv,
  EmpBasicInformationHeader,
  EmpBasicInformationImg,
  EmpBasicInformationImgBtnWrapper,
  EmpBasicInformationInput, EmpBasicInformationRadio,
  EmpBasicInformationRadioWrapper, EmpBasicInformationSelect,
  EmpInformationBtn,
  EmpInformationBtnWrapper,
  EmpInformationWrapper, Option,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import request from "../../../../../../utils/axiosUtil";

const modifyProfile = async (profile) => {
  const { data } = await request.put("/emp/updateprofile", profile);
  return data;
};

const removeProfile = async (empNo) => {
  const { data } = await request.put(`/emp/removeProfile/${empNo}`);
  return data;
};

function EmpBasicInformation({ clickEmpModify,
  empInformation, changeEmpInput, handleOnRegisterModal,
  setRefresh, refresh }) {
  const [file, setFile] = useState();
  // 미리보기
  const [preview, setPreview] = useState(null);
  const fileInput = useRef();

  // 파일 선택하고 다른 사원 눌러도 file 값들이 저장되어 있어, 호출 시 비워준다.
  useEffect(() => {
    setPreview(null);
    fileInput.current.value = null;
    setFile(null);
  }, [empInformation]);

  const onSaveFile = (e) => {
    const fileReader = new FileReader();
    // 파일 저장
    const onloadFile = e.target.files[0];
    setFile(onloadFile);

    fileReader.readAsDataURL(onloadFile);
    fileReader.onloadend = () => {
      setPreview(fileReader.result);
    };
  };

  // 파일 업데이트
  const onUpload = (empNo) => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", empNo);
    modifyProfile(formData).then(() => {
      Swal.fire("수정 완료", "프로필이 변경되었습니다.", "success").then();
      setRefresh(!refresh);
    });
  };

  // 파일 데이터 null로 업데이트
  const onDelete = (empNo) => {
    removeProfile(empNo).then(() => {
      Swal.fire("삭제 완료", "프로필이 삭제되었습니다.", "success").then();
      setRefresh(!refresh);
      setPreview(null);
      fileInput.current.value = null;
      setFile(null);
      empInformation.profileUrl = null;
    });
  };

  // 되돌리기
  const profileReset = () => {
    setFile(null);
    fileInput.current.value = "";
    setPreview(empInformation.profileUrl);
  };

  return (
    <EmpInformationWrapper>
      <EmpInformationBtnWrapper>
        <EmpInformationBtn type="button" onClick={() => { handleOnRegisterModal(); }}>추가</EmpInformationBtn>
        <EmpInformationBtn type="button" onClick={() => { clickEmpModify(); }}>수정</EmpInformationBtn>
      </EmpInformationBtnWrapper>

      <EmpBasicInformationDiv>

        <EmpBasicInformationHeader>사진</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationImg profileUrl={preview || empInformation.profileUrl} />
          <EmpBasicInformationImgBtnWrapper>
            <EmpBasicInformationInput type="file" onChange={(e) => { onSaveFile(e); }} ref={fileInput} />
            <Button type="button" onClick={() => { onUpload(empInformation.empNo); }}>프로필 등록</Button>
            <Button type="button" onClick={() => { onDelete(empInformation.empNo); }}>프로필 삭제</Button>
            <Button type="button" onClick={() => { profileReset(); }}>되돌리기</Button>
          </EmpBasicInformationImgBtnWrapper>
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader className="essential">이름</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="text" name="empName" className="essential" value={empInformation.empName} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>ID</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="text" className="unchangeable" disabled value={empInformation.username} />
        </EmpBasicInformationBody>

        {/* <EmpBasicInformationHeader>비밀번호</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput
            type="text"
            name="password"
            onChange={(e) => { changeEmpInput(e); }}
            className="essential" readOnly
          />
        </EmpBasicInformationBody> */}

        <EmpBasicInformationHeader>성별</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationSelect name="gender" value={empInformation.gender} onChange={(e) => { changeEmpInput(e); }}>
            <Option value="-">--성별 선택--</Option>
            <Option value="남성">남성</Option>
            <Option value="여성">여성</Option>
          </EmpBasicInformationSelect>
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>이메일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="text" name="email" value={empInformation.email} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>휴대전화</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="text" name="empPhone" value={empInformation.empPhone} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>주소</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="text" name="empAddress" value={empInformation.empAddress} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>최초입사일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="date" name="firstHiredDate" value={empInformation.firstHiredDate} readOnly className="unchangeable" />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>최종퇴사일</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationInput type="date" name="lastRetiredDate" value={empInformation.lastRetiredDate === null ? "" : empInformation.lastRetiredDate} onChange={(e) => { changeEmpInput(e); }} />
        </EmpBasicInformationBody>

        <EmpBasicInformationHeader>계정 사용</EmpBasicInformationHeader>
        <EmpBasicInformationBody>
          <EmpBasicInformationRadioWrapper>
            <EmpBasicInformationRadio name="empUse" type="radio" value="true" checked={empInformation.empUse === true} onChange={(e) => { changeEmpInput(e); }} />사용
            <EmpBasicInformationRadio name="empUse" type="radio" value="false" checked={empInformation.empUse === false} onChange={(e) => { changeEmpInput(e); }} />미사용
          </EmpBasicInformationRadioWrapper>
        </EmpBasicInformationBody>
      </EmpBasicInformationDiv>
    </EmpInformationWrapper>
  );
}

export default EmpBasicInformation;
