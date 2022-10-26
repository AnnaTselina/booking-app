import React from "react";
import "./styles.scss";

interface ISignUpOptions {
  email: boolean;
  setSignUpOption: React.Dispatch<React.SetStateAction<null | "email">>;
}

const SignUpOptions = ({ email = true, setSignUpOption }: ISignUpOptions) => (
  <div className="sign-up-options">
    {email && (
      <button
        type="button"
        className="sign-up-options__item"
        onClick={() => {
          setSignUpOption("email");
        }}
      >
        Sign up with email
      </button>
    )}
  </div>
);

export default SignUpOptions;
