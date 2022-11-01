import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import "./styles.scss";
import { GET_USER, LOGIN_MUTATION } from "../../queries-graphql";
import { userVar } from "../../apollo-client";
import { EMAIL_REGEX } from "../../utils/constants";

const emailInputErrorMessage = "Please, enter valid email.";
const passwordInputErrorMessage = "Please, provide password.";
const loginUnavailableMessage = "Unable to log in. Please, try again later.";

interface ILoginFormProps {
  onSuccessSubmit?: () => void;
}

const LoginForm = (props: ILoginFormProps) => {
  const { onSuccessSubmit } = props;

  const [formValues, setFormValues] = useState({
    email: { value: "", valid: false },
    password: { value: "", valid: false },
  });
  const [emailInputMessage, setEmailInputMessage] = useState("");
  const [passwordInputMessage, setPasswordInputMessage] = useState("");
  const [formIsValid, setFormIsvalid] = useState(false);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formValues.email.value,
      password: formValues.password.value,
    },
    update(_, result) {
      if (result.data.login) {
        userVar(result.data.login.id);
        if (onSuccessSubmit) {
          onSuccessSubmit();
        }
      }
    },
    refetchQueries: [{ query: GET_USER }],
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailIsValid = EMAIL_REGEX.test(e.target.value);
    setFormValues((state) => ({
      ...state,
      email: { value: e.target.value, valid: emailIsValid },
    }));
    if (emailInputMessage) {
      setEmailInputMessage("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordIsValid = !!e.target.value.length;
    setFormValues((state) => ({
      ...state,
      password: { value: e.target.value, valid: passwordIsValid },
    }));
    if (passwordInputMessage) {
      setPasswordInputMessage("");
    }
  };

  const checkEmail = () => {
    if (!formValues.email.valid) {
      setEmailInputMessage(emailInputErrorMessage);
    }
  };

  const validatePassword = () => {
    if (!formValues.password.valid) {
      setPasswordInputMessage(passwordInputErrorMessage);
    }
  };

  useEffect(() => {
    if (Object.values(formValues).every((input) => input.valid)) {
      setFormIsvalid(true);
    } else {
      setFormIsvalid(false);
    }
  }, [formValues]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login();
  };

  return (
    <form className="login-form" onSubmit={submit}>
      <div className={`login-form-element ${emailInputMessage ? "input-error" : ""}`}>
        <label htmlFor="login-email">Email</label>
        <input
          type="email"
          id="login-email"
          value={formValues.email.value}
          onChange={handleEmailChange}
          onBlur={checkEmail}
        />
        <p className="login-form-element-error">{emailInputMessage}</p>
      </div>

      <div className={`login-form-element ${passwordInputMessage ? "input-error" : ""}`}>
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          value={formValues.password.value}
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        <p className="login-form-element-error">{passwordInputMessage}</p>
      </div>

      <div className="sign-up-form-error">
        {error ? error.message || loginUnavailableMessage : ""}
      </div>

      <div className="login-form-submit">
        <button type="submit" disabled={!formIsValid}>
          {loading && <span className="icon-loading" />}
          Log in
        </button>
      </div>
    </form>
  );
};

LoginForm.defaultProps = {
  onSuccessSubmit: () => {},
};

export default LoginForm;
