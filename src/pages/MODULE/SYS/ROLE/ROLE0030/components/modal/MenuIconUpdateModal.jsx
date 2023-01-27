import React, { useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled, { css } from "styled-components";
import { PUT_CONFIG_MENUICON } from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import { FileInput, Image, Layout, MenuButton } from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";

const MenuIconUpdateModal = ({ queryMenu }) => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  const imageInput = useRef();

  const handleOnGetFile = () => {
    imageInput.current?.click();
  };

  const onSaveFile = (e) => {
    const fileReader = new FileReader();
    const onloadFile = e.target.files[0];
    setFile(onloadFile);
    fileReader.readAsDataURL(onloadFile);
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
  };

  const handleOnUpload = async () => {
    const formData = new FormData();
    formData.append("multipartFile", file);
    formData.append("key", queryMenu?.menuCode);
    await PUT_CONFIG_MENUICON(formData).then((res) => {
      handleCloseModal();
    });
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title={`${queryMenu?.menuName} 메뉴 아이콘 수정`}
    >
      <Layout>
        <IconUploadLayout>
          <IconWrapper>
            <div>현재 아이콘</div>
            <Image src={queryMenu?.iconUrl} alt="이전 메뉴 아이콘" />
          </IconWrapper>
          <IconWrapper>
            <div>수정할 아이콘</div>
            {image && <Image src={image} alt="수정할 메뉴 아이콘" />}
          </IconWrapper>
        </IconUploadLayout>
        <FileInput
          type="file"
          onChange={onSaveFile}
          ref={imageInput}
        />
        <IconUploadLayout>
          <MenuButton type="button" onClick={handleOnGetFile}>아이콘 가져오기</MenuButton>
        </IconUploadLayout>
        <MenuButton onClick={handleOnUpload}>수정하기</MenuButton>
      </Layout>
    </Modal>
  );
};

const IconUploadLayout = styled.div`
  ${({}) => css`
    display: flex;
  `}
`;

const IconWrapper = styled.div`
  width: 100%;
`;


export default MenuIconUpdateModal;
