import React from "react";
import "./styles.scss";

interface ISignUpOptions {
  email?: boolean;
  google?: boolean;
  setSignUpOptionForm: React.Dispatch<React.SetStateAction<null | "email">>;
}

const SignUpOptions = ({ email, google, setSignUpOptionForm }: ISignUpOptions) => (
  <div className="sign-up-options">
    {email && (
      <button
        type="button"
        className="sign-up-options__item"
        onClick={() => {
          setSignUpOptionForm("email");
        }}
      >
        Sign up with email
      </button>
    )}
    {google && (
      <a className="sign-up-options__item link" href="/auth/google/login">
        Sign up with google
      </a>
    )}
  </div>
);

SignUpOptions.defaultProps = {
  email: true,
  google: false,
};

export default SignUpOptions;
