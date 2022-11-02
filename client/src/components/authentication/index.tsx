import React, { useState } from "react";
import LogInOptions from "../log-in-options";
import Modal from "../modal";
import SignUpOptions from "../sign-up-options";

const Authentication = ({
  closeAuthenticationCallback,
}: {
  closeAuthenticationCallback: () => void;
}) => {
  const [logInOrSignUp, setLogInOrSignUp] = useState<"Log in" | "Sign up">("Log in");
  const [modalOpened, setModalOpened] = useState(true);

  const closeModal = () => {
    setModalOpened((state) => !state);
    setLogInOrSignUp("Log in");
    closeAuthenticationCallback();
  };

  return (
    <Modal isOpen={modalOpened} handleClose={closeModal} heading={`${logInOrSignUp}:`}>
      {logInOrSignUp === "Log in" ? (
        <LogInOptions google setLogInOrSignUp={setLogInOrSignUp} onSuccessSubmit={closeModal} />
      ) : (
        <SignUpOptions google setLogInOrSignUp={setLogInOrSignUp} />
      )}
    </Modal>
  );
};

export default Authentication;
