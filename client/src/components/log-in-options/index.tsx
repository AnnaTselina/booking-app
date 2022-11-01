import React, { useState } from "react";
import LoginForm from "../login-form";

interface ILogInOptions {
  email?: boolean;
  google?: boolean;
  setLogInOrSignUp: React.Dispatch<React.SetStateAction<"Log in" | "Sign up">>;
  onSuccessSubmit?: () => void;
}

const LogInOptions = ({ email, google, setLogInOrSignUp, onSuccessSubmit }: ILogInOptions) => {
  const [logInOption, setLogInOption] = useState<null | "email">(null);

  return logInOption === "email" ? (
    <LoginForm onSuccessSubmit={onSuccessSubmit} />
  ) : (
    <div className="log-in-options">
      <div>
        {email && (
          <button
            type="button"
            className="log-in-options__item"
            onClick={() => {
              setLogInOption("email");
            }}
          >
            Log with email and password
          </button>
        )}
        {google && (
          <a className="sign-up-options__item link" href="/auth/google/login">
            Proceed with google account
          </a>
        )}
      </div>

      <p className="small">
        Don&apos;t have an account? Let&apos;s{" "}
        <button
          type="button"
          onClick={() => {
            setLogInOrSignUp("Sign up");
          }}
          className="link"
        >
          create one.
        </button>
      </p>
    </div>
  );
};

LogInOptions.defaultProps = {
  email: true,
  google: false,
  onSuccessSubmit: () => {},
};

export default LogInOptions;
