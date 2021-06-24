import { ReactNode } from "react";
import ModalContainer from "react-modal";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(5, 2, 6, 0.8)",
  },
  content: {
    background: "var(--gray-100)",
    overflow: "auto",
    maxWidth: "590px",
    width: "100%",
    padding: "4rem 1rem",
    borderRadius: "8px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
ModalContainer.setAppElement("#root");

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
};

export function Modal({ isOpen, children, closeModal, ...rest }: ModalProps) {
  return (
    <ModalContainer
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      {...rest}
    >
      {children}
    </ModalContainer>
  );
}
