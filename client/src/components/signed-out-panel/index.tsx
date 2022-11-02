import { useState } from "react";
import Authentication from "../authentication";
import "./styles.scss";

const SignedOutPanel = () => {
  const [authenticationActive, setAuthenticationActive] = useState(false);

  return (
    <>
      <div className="header-buttons">
        <button
          type="button"
          className="link not-underlined"
          onClick={() => setAuthenticationActive(true)}
        >
          Log in
        </button>
      </div>

      {authenticationActive && (
        <Authentication
          closeAuthenticationCallback={() => {
            setAuthenticationActive(false);
          }}
        />
      )}
    </>
  );
};

export default SignedOutPanel;
