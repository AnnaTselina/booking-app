import React, { useEffect, useRef, useState } from "react";
import { useMatch } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "./styles.scss";
import Modal from "../modal";
import { CONFIRM_USER_MUTATION } from "../../queries-graphql";

const EMAIL_CONFIRMED_TEXT = "Email successfully confirmed.";
const SERVER_ERROR = "An error occurred trying to confirm user. Please, try again later.";

const ConfirmUser = () => {
  const [confirmationModalOpened, setConfirmationModalOpened] = useState(false);
  const id = useRef<null | string>(null);

  const match = useMatch("/user/confirm/:id");

  const [confirmUser, { data, loading, error }] = useMutation(CONFIRM_USER_MUTATION);

  useEffect(() => {
    if (match?.params?.id && id.current !== match.params.id) {
      id.current = match.params.id;
      confirmUser({ variables: { id: match.params.id } });
      setConfirmationModalOpened(true);
    }
  }, [match]);

  return (
    <Modal
      isOpen={confirmationModalOpened}
      handleClose={() => {
        setConfirmationModalOpened(false);
      }}
      heading="Email confirmation"
    >
      <>
        {loading && (
          <div className="confirm-user-loading">
            <span className="icon-loading" />
          </div>
        )}
        {error && <p className="confirm-user-text">{error.message || SERVER_ERROR}</p>}
        {data?.confirmUser && <p className="confirm-user-text">{EMAIL_CONFIRMED_TEXT}</p>}
      </>
    </Modal>
  );
};

export default ConfirmUser;
