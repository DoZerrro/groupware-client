import React from "react";
import {
  EmpDetail,
  EmpDetailItem,
  EmpDetailTitle,
  EmpInformationDiv,
  EmpItemSpan,
  EmpProfil,
  EmpProfilDetail,
  EmpProfilImg,
  EmpProfilItem,
  EmpProfilVerticalSpan,
  MygroupBtn,
} from "@pages/MODULE/SYS/ROLE/ROLE0020/components/StyledCommon";
import useModal from "../../../../../../../hooks/useModal";

function OrgatreeEmpDetail({ empInfo }) {
  // 해당 사원 정보 구조분해
  const { orgaNo, empName, empRank, username, path, empPhone, email, profileUrl } = empInfo;
  const data = { menucode: "MyGroup", menuname: "마이그룹", orgaNo };
  const { openModal } = useModal();

  // 조직도 모달창을 띄워줄 handler
  const handleOnModal = () => {
    openModal({ type: "MyGroup", props: data });
  };

  return (
    <EmpInformationDiv>
      <EmpProfil>
        {orgaNo
          && (
            <>
              <MygroupBtn type="button" onClick={handleOnModal} />
              <EmpProfilItem>
                <EmpProfilImg
                  src={profileUrl.indexOf("null") > -1 ? "" : profileUrl}
                  alt="프로필 이미지"
                  size="120"
                />
                <EmpProfilDetail fontWeight="bold" fontSize="1.3" marginTop="1">{empName}&nbsp;{empRank}</EmpProfilDetail>
                <EmpProfilVerticalSpan />
                <EmpProfilDetail fontSize="1.2" marginTop="0.7">{username}</EmpProfilDetail>
              </EmpProfilItem>
            </>
          )}
      </EmpProfil>
      <EmpDetail>
        <EmpDetailItem>
          <EmpDetailTitle>
            소속부서
          </EmpDetailTitle>
          <EmpItemSpan>
            {path}
          </EmpItemSpan>
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            전화번호
          </EmpDetailTitle>
          <EmpItemSpan>
            {empPhone}
          </EmpItemSpan>
        </EmpDetailItem>
        <EmpDetailItem>
          <EmpDetailTitle>
            이메일
          </EmpDetailTitle>
          <EmpItemSpan>
            {email}
          </EmpItemSpan>
        </EmpDetailItem>
      </EmpDetail>
    </EmpInformationDiv>
  );
}


export default OrgatreeEmpDetail;
