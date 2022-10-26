import React, { useEffect } from "react";
import Portal from "../portal";
import "./styles.scss";

interface IModal {
  children: React.ReactElement;
  isOpen: boolean;
  handleClose: () => void;
  heading?: string;
}

interface KeyboardEvent {
  key: string;
}

const Modal = ({ children, isOpen, handleClose, heading }: IModal) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === "Escape" ? handleClose() : null);
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <Portal wrapperId="portal-modal-container">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-content-heading">
            <h3>{heading}</h3>
            <button type="button" onClick={handleClose} className="link">
              <span className="icon-cancel" />
            </button>
          </div>

          {children}
        </div>
      </div>
    </Portal>
  );
};

Modal.defaultProps = {
  heading: "",
};

export default Modal;
