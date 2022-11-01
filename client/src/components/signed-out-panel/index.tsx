import { useState } from "react";
import LogInOptions from "../log-in-options";
import Modal from "../modal";
import SignUpOptions from "../sign-up-options";
import "./styles.scss";
// import SignUpForm from "../sign-up-form";
// import SignUpOptions from "../sign-up-options";

const SignedOutPanel = () => {
  const [logInOrSignUp, setLogInOrSignUp] = useState<"Log in" | "Sign up">("Log in");
  const [modalOpened, setModalOpened] = useState(false);

  const closeModal = () => {
    setModalOpened((state) => !state);
    setLogInOrSignUp("Log in");
  };

  return (
    <>
      <div className="header-buttons">
        <button type="button" className="link not-underlined" onClick={closeModal}>
          Log in
        </button>
      </div>

      <Modal isOpen={modalOpened} handleClose={closeModal} heading={`${logInOrSignUp}:`}>
        {logInOrSignUp === "Log in" ? (
          <LogInOptions google setLogInOrSignUp={setLogInOrSignUp} onSuccessSubmit={closeModal} />
        ) : (
          <SignUpOptions google setLogInOrSignUp={setLogInOrSignUp} />
        )}
      </Modal>
    </>
  );
};

export default SignedOutPanel;
