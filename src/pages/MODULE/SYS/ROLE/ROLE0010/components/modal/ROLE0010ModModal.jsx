import React, { useEffect, useState } from "react";
import Modal from "@components/modal/Modal";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useModal from "../../../../../../../hooks/useModal";
import request from "../../../../../../../utils/axiosUtil";
import { changeRefresh } from "../../../../../../../store/reducer/roleGroupSlice";
import Swal from "sweetalert2";


const initDTO = {
  companyNo: 0,
  roleGroupNo: 0,
  roleGroupName: "",
  roleGroupUse: true,
};

function Role0010ModModal({ roleGroup, companyList }) {
  const dispatch = useDispatch();
  const [updateDTO, setUpdateDTO] = useState({ ...initDTO });
  const { closeModal } = useModal();
  const { roleGroupName, roleGroupNo, roleGroupUse, companyNo } = updateDTO;

  useEffect(() => {
    setUpdateDTO({ ...roleGroup });
  }, [roleGroup]);

  const handleCloseModal = () => {
    closeModal();
  };

  const roleGroupChangeEvent = (e) => {
    const { name, value } = e.target;
    if (name === "roleGroupName" || name === "companyNo") {
      updateDTO[name] = value;
    }
    if (name === "roleGroupUse") {
      updateDTO[name] = !roleGroupUse;
    }
    setUpdateDTO({ ...updateDTO });
  };

  const onClickDelBtn = () => {
    request.delete(`/role-group/${roleGroupNo}`)
      .then((r) => {
        Swal.fire("권한그룹 삭제가 완료되었습니다.", "", "success").then();
        dispatch(changeRefresh());
        setUpdateDTO({ ...initDTO });
        closeModal();
      });
  };

  const onClickModBtn = () => {
    request.put("/role-group", updateDTO)
      .then((r) => {
        Swal.fire("권한그룹 수정이 완료되었습니다.", "", "success").then();
        setUpdateDTO({ ...initDTO });
        closeModal();
        dispatch(changeRefresh());
      });
  };

  const onChangeSelectBoxEvent = (selectedCompanyNo) => {
    updateDTO.companyNo = selectedCompanyNo;
    setUpdateDTO({ ...updateDTO });
  };

  return (
    <Modal
      onClose={handleCloseModal}
      title="권한 그룹 수정"
    >
      <ModalContent>
        <div>
          회사명 :
          <select onChange={(e) => onChangeSelectBoxEvent(e.target.value)} value={companyNo}>
            {companyList.map((company) => <option key={company.companyNo} value={company.companyNo}>{company.companyName}</option>)}
          </select>
        </div>
        <div>
          권한그룹명 :
          <Input name="roleGroupName" value={roleGroupName} type="text" onChange={(e) => roleGroupChangeEvent(e)} />
        </div>
        <div>
          사용여부 :
          사용<Input name="roleGroupUse" checked={roleGroupUse} type="radio" onChange={(e) => roleGroupChangeEvent(e)} />
          미사용<Input name="roleGroupUse" checked={!roleGroupUse} type="radio" onChange={(e) => roleGroupChangeEvent(e)} />
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClickModBtn}>수정</Button>
        <Button onClick={onClickDelBtn}>삭제</Button>
        <Button onClick={handleCloseModal}>취소</Button>
      </ModalFooter>
    </Modal>
  );
}

export default Role0010ModModal;

const Button = styled.button`
  border: blue solid 1px;
  width: 100px;
  height: 70px;
`;


const Input = styled.input`
  border: black 1px solid;
`;

const ModalContent = styled.div`
  border: red solid 1px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 200px;
`;

const ModalFooter = styled.div`
  border: red solid 1px;
  height: 150px;
`;
