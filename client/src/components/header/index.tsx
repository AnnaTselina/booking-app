import { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../utils/routes";
import Modal from "../modal";
import "./styles.scss";

const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const closeModal = () => setModalOpened((state) => !state);

  return (
    <header>
      <NavLink to={routes.HOME} className="logo-link">
        <h1 className="logo">Swap</h1>
      </NavLink>

      <div className="header-buttons">
        <button type="button" className="link not-underlined" onClick={closeModal}>
          Sign up
        </button>
      </div>

      <Modal isOpen={modalOpened} handleClose={closeModal} heading="Modal heading">
        <div>modal content</div>
      </Modal>
    </header>
  );
};

export default Header;
