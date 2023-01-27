import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import { DELETE_CONFIG_MENU, PUT_CONFIG_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import { FileInput, Image, Layout, MenuButton, Text } from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import { CenterGrid, Divider } from "@components/Grid";
import Swal from "sweetalert2";

const MenuDeleteConfirmModal = ({ queryMenu }) => {
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };


  const handleOnDelete = async () => {
    await DELETE_CONFIG_MENU(queryMenu.menuCode).then((res) => {
      Swal.fire({
        title: "메뉴 삭제",
        html: "메뉴가 삭제되었습니다.",
        icon: "success",
      });
      handleCloseModal();
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${queryMenu?.menuName} 메뉴 아이콘 삭제`}
    >
      <Layout>
        <CenterGrid columns="12">
          <Divider span="12">
            <Image src={queryMenu?.iconUrl} />
          </Divider>
          <Divider span="12">
            {queryMenu?.menuName}
          </Divider>
          <Divider span="12">
            삭제 하시겠습니까?
          </Divider>

        </CenterGrid>
        <MenuButton onClick={handleOnDelete}>삭제하기</MenuButton>
      </Layout>
    </Modal>
  );
};


export default MenuDeleteConfirmModal;
