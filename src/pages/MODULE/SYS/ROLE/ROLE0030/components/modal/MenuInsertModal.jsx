import React, { useEffect, useRef, useState } from "react";
import Modal from "@components/modal/Modal";
import useModal from "@hooks/useModal";
import styled, { css } from "styled-components";
import {
  GET_CONFIG_TREE_MENULIST, POST_CONFIG_MENU,
  PUT_CONFIG_MENU,
  PUT_CONFIG_MENUICON,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/api/menuConfigurationApi";
import {
  ColumnName,
  FormItemWrapper, Image, InputWrapper,
  Layout, MenuButton,
  MenuFormWrapper,
  Text,
} from "@pages/MODULE/SYS/ROLE/ROLE0030/components/Style";
import Button from "@components/Button";
import { Input } from "@components/Input";
import MenuSearchTreeComp from "@pages/MODULE/SYS/ROLE/ROLE0030/components/tree/MenuSearchTreeComp";
import Swal from "sweetalert2";


const MenuInsertModal = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState(null);
  const [menu, setMenu] = useState();
  const [menuList, setMenuList] = useState();
  const [searchMenu, setSearchMenu] = useState();
  const [upperMenu, setUpperMenu] = useState();
  const { closeModal } = useModal();

  const handleCloseModal = () => {
    closeModal();
  };

  useEffect(() => {
    GET_CONFIG_TREE_MENULIST(false, "gnb").then((res) => {
      setMenuList(res.data);
    });
  }, []);

  useEffect(() => {
    setUpperMenu(searchMenu);
  }, [searchMenu]);


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

  const onUpload = async () => {
    const formData = new FormData();
    formData.append("upperMenuNo", upperMenu?.menuNo || 0);
    formData.append("menuCode", menu.menuCode);
    formData.append("menuName", menu.menuName);
    formData.append("mainFlag", menu?.mainFlag || false);
    formData.append("menuOrder", menu.menuOrder);
    formData.append("multipartFile", file || "none");
    await POST_CONFIG_MENU(formData).then((res) => {
      Swal.fire({
        title: "?????? ??????",
        html: "????????? ?????????????????????.",
        icon: "success",
      });
      closeModal();
    });
  };

  const handleOnChangeForUpperMenu = () => {
    setUpperMenu(null);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    const origin = { ...menu };
    origin[name] = value;
    setMenu(origin);
  };

  const handleOnCheckbox = (e) => {
    const { name, checked } = e.target;
    const origin = { ...menu };
    origin[name] = checked;
    setMenu(origin);
  };


  return (
    <Modal
      onClose={handleCloseModal}
      title="?????? ??????"
    >
      <Wrapper2>
        <MenuSearchTreeComp
          menuList={menuList}
          setSearchMenu={setSearchMenu}
        />
        <MenuFormWrapper>
          <Layout>
        {<button type="button" onClick={handleOnChangeForUpperMenu}>GNB??? ????????????</button>}
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ????????????
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="upperMenuNo"
                  value={upperMenu?.menuNo}
                  hidden
                />
                {upperMenu?.menuName || "GNB"}
                <Text>
                </Text>
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ?????????
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuName"
                  value={menu?.menuName}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ????????????
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuCode"
                  value={menu?.menuCode}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ????????????
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  type="checkbox"
                  name="mainFlag"
                  value={menu?.mainFlag}
                  checked={menu?.mainFlag}
                  onChange={handleOnCheckbox}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ??????
                </Text>
              </ColumnName>
              <InputWrapper>
                <Input
                  name="menuOrder"
                  value={menu?.menuOrder}
                  onChange={handleOnChange}
                />
              </InputWrapper>
            </FormItemWrapper>
            <FormItemWrapper>
              <ColumnName>
                <Text>
                  ?????????
                </Text>
              </ColumnName>
              <Image src={image} />
              <FileInput
                type="file"
                onChange={onSaveFile}
                ref={imageInput}
              />
              <Button type="button" onClick={handleOnGetFile}>????????? ????????????</Button>
            </FormItemWrapper>
            <MenuButton onClick={onUpload}>?????? ??????</MenuButton>
          </Layout>
        </MenuFormWrapper>
      </Wrapper2>
    </Modal>
  );
};


const FileInput = styled.input.attrs({
  type: "file",
})`
  display: none;
`;

const Wrapper2 = styled.div`
  ${({}) => {
    return css`
      display: flex;
    `;
  }}
`;

export default MenuInsertModal;
