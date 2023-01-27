import { useDispatch } from "react-redux";
import { closeModal, openModal } from "@reducer/modalSlice";

/**
 * 모달 Hooks 입니다.
 *
 * 앱 내 공통적으로 사용하는 모달을 Hooks 형태로 제공합니다.
 * @return {{openModal: handleOpenModal, closeModal: handleCloseModal}}
 *
 * @author 김민준
 */
const useModal = () => {
  const dispatch = useDispatch();

  const handleOpenModal = ({ type, props }) => {
    dispatch(openModal({ type, props }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};

export default useModal;
