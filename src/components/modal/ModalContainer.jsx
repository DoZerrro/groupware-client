import React, { Suspense } from "react";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { modalSelector } from "@reducer/modalSlice";
import loadable from "@loadable/component";


import Spinner from "@components/Spinner";

const ORGA0010Modal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0010/components/modal/ORGA0010Modal"));
const mygroupModal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0010/components/modal/MygroupModal"));
const ORGA0020Modal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0020/components/modal/ORGA0020Modal"));
const ORGA0030Modal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0030/components/modal/ORGA0030Modal"));
const ORGA0030RegisterModal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0030/components/modal/ORGA0030RegisterModal"));
const RegisterOrgaModal = loadable(() => import("@pages/MODULE/SYS/ORGA/ORGA0030/components/modal/RegisterOrgaModal"));
const ROLE0010Modal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0010/components/modal/ROLE0010Modal"));
const ROLE0010ModModal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0010/components/modal/ROLE0010ModModal"));
const ROLE0020Modal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0020/components/modal/ROLE0020Modal"));
const ProfileChangeModal = loadable(() => import("@pages/auth/Profile/modal/ProfileChangeModal"));

const MenuIconUpdateModal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0030/components/modal/MenuIconUpdateModal"));
const MenuInsertModal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0030/components/modal/MenuInsertModal"));
const MenuDeleteConfirmModal = loadable(() => import("@pages/MODULE/SYS/ROLE/ROLE0030/components/modal/MenuDeleteConfirmModal"));

const MODAL_COMPONENTS = {
  ORGA0010: ORGA0010Modal,
  MyGroup: mygroupModal,
  ORGA0020: ORGA0020Modal,
  ORGA0030: ORGA0030Modal,
  ORGA0030Register: ORGA0030RegisterModal,
  RegisterOrga: RegisterOrgaModal,
  ROLE0010: ROLE0010Modal,
  ROLE0010Mod: ROLE0010ModModal,
  ROLE0020: ROLE0020Modal,
  ProfileChange: ProfileChangeModal,

  MenuIconUpdate: MenuIconUpdateModal,
  MenuInsert: MenuInsertModal,
  MenuDeleteConfirm: MenuDeleteConfirmModal,
};

/**
 * 모달 컨테이너입니다.
 * 앱 전역에 사용할 모달을 등록할 수 있습니다.
 *
 * @return {}
 * @constructor
 * @author 김민준
 */
const ModalContainer = () => {
  const modalList = useSelector(modalSelector);

  const modals = modalList.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];

    return <ModalComponent key={type} {...props} />;
  });

  return createPortal(<Suspense fallback={<Spinner />}>{ modals }</Suspense>, document.querySelector("#portal"));
};

export default ModalContainer;
