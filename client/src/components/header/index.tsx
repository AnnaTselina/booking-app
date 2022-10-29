import { useQuery, useReactiveVar } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { userVar } from "../../apollo-client";
import { GET_USER } from "../../queries-graphql";
import routes from "../../utils/routes";
import SignedInPanel from "../signed-in-panel";
import SignedOutPanel from "../signed-out-panel";
import "./styles.scss";

const Header = () => {
  const { data } = useQuery(GET_USER, {
    fetchPolicy: "network-only",
    onCompleted(result) {
      if (result?.getUser?.email) {
        userVar(result?.getUser?.email);
      }
    },
  });

  const userId = useReactiveVar(userVar);

  return (
    <header>
      <NavLink to={routes.HOME} className="logo-link">
        <h1 className="logo">Swap</h1>
      </NavLink>

      {userId ? <SignedInPanel email={data.getUser.email} /> : <SignedOutPanel />}
    </header>
  );
};

export default Header;
