import { useState } from "react";
import Modal from "../modal";
import SignUpForm from "../sign-up-form";
import SignUpOptions from "../sign-up-options";

const SignedOutPanel = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [signUpOption, setSignUpOption] = useState<null | "email">(null);

  const closeModal = () => {
    setSignUpOption(null);
    setModalOpened((state) => !state);
  };

  return (
    <>
      <div className="header-buttons">
        <button type="button" className="link not-underlined" onClick={closeModal}>
          Sign in
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
          <SignUpOptions email google setSignUpOptionForm={setSignUpOption} />
        )}
      </Modal>
    </>
  );
};

export default SignedOutPanel;
