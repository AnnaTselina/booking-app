import React, { useState } from "react";
import SignUpForm from "../sign-up-form";

interface ISignUpOptions {
  email?: boolean;
  google?: boolean;
  setLogInOrSignUp: React.Dispatch<React.SetStateAction<"Log in" | "Sign up">>;
}

const SignUpOptions = ({ email, google, setLogInOrSignUp }: ISignUpOptions) => {
  const [signUpOption, setSignUpOption] = useState<null | "email">(null);

  return signUpOption === "email" ? (
    <SignUpForm />
  ) : (
    <div className="sign-up-options">
      <div>
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
        {google && (
          <a className="sign-up-options__item link" href="/auth/google/login">
            Sign up with google
          </a>
        )}
      </div>
      <p className="small">
        Already have an account? Let&apos;s{" "}
        <button
          type="button"
          onClick={() => {
            setLogInOrSignUp("Log in");
          }}
          className="link"
        >
          log in.
        </button>
      </p>
    </div>
  );
};

SignUpOptions.defaultProps = {
  email: true,
  google: false,
};

export default SignUpOptions;
