import { useState } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../utils/routes";
import Modal from "../modal";
import SignUpForm from "../sign-up-form";
// import SignUpForm from "../sign-up-form";
import SignUpOptions from "../sign-up-options";
import "./styles.scss";

const Header = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [signUpOption, setSignUpOption] = useState<null | "email">(null);

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

      <Modal
        isOpen={modalOpened}
        handleClose={closeModal}
        heading={`Sign up with ${signUpOption || ""}:`}
      >
        {signUpOption === "email" ? (
          <SignUpForm />
        ) : (
          <SignUpOptions email setSignUpOption={setSignUpOption} />
        )}
      </Modal>
    </header>
  );
};

export default Header;
