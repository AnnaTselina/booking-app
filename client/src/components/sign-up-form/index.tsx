import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { SIGN_UP_MUTATION } from "../../queries-graphql";
import "./styles.scss";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../../utils/constants";

const emailInputErrorMessage = "Please, enter valid email.";
const passwordInputErrorMessage =
  "Please, enter password that is at least 8 characters long, contains at least one lowercase and one uppercase letter and at least one special character.";
const signUpSuccessMessage = "Please, check your email for verification.";

const SignUpForm = () => {
  const [formValues, setFormValues] = useState({
    email: { value: "", valid: false },
    password: { value: "", valid: false },
  });
  const [emailInputMessage, setEmailInputMessage] = useState("");
  const [passwordInputMessage, setPasswordInputMessage] = useState("");
  const [formIsValid, setFormIsvalid] = useState(false);
  const [successMessage, setSucessMessage] = useState("");

  const [signup, { data, loading, error }] = useMutation(SIGN_UP_MUTATION, {
    variables: {
      email: formValues.email.value,
      password: formValues.password.value,
    },
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
    const passwordIsValid = PASSWORD_REGEX.test(e.target.value);
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

  useEffect(() => {
    if (data) {
      if (data.signUp) {
        setSucessMessage(signUpSuccessMessage);
      } else {
        setFormValues((state) => ({
          ...state,
          password: { value: "", valid: false },
        }));
      }
    }
  }, [data]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup();
  };

  const switchToLogIn = () => {
    // setLogInModal && setLogInModal(true);
    // setSignUpModal && setSignUpModal(false);
  };

  return successMessage ? (
    <div className="sign-up-form-success">{successMessage}</div>
  ) : (
    <form className="sign-up-form" onSubmit={submit}>
      <div className={`sign-up-form-element ${emailInputMessage ? "input-error" : ""}`}>
        <label htmlFor="sign-up-email">Email</label>
        <input
          type="email"
          id="sign-up-email"
          value={formValues.email.value}
          onChange={handleEmailChange}
          onBlur={checkEmail}
        />
        <p className="sign-up-form-element-error">{emailInputMessage}</p>
      </div>

      <div className={`sign-up-form-element ${passwordInputMessage ? "input-error" : ""}`}>
        <label htmlFor="sign-up-password">Password</label>
        <input
          type="password"
          id="sign-up-password"
          value={formValues.password.value}
          onChange={handlePasswordChange}
          onBlur={validatePassword}
        />
        <p className="sign-up-form-element-error">{passwordInputMessage}</p>
      </div>

      <div className="sign-up-form-error">{error ? error.message : ""}</div>

      <p className="small">
        Already have an account?{" "}
        <button type="button" className="link small" onClick={switchToLogIn}>
          Log in
        </button>
      </p>

      <div className="sign-up-form-submit">
        <button type="submit" disabled={!formIsValid}>
          {loading && <span className="icon-loading" />} Sign up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
