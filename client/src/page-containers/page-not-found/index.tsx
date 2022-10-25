import { NavLink } from "react-router-dom";
import routes from "../../utils/routes";
import "./styles.scss";

const PageNotFound = () => (
  <div className="page-not-found">
    <p>Ooops! Requested page was not found.</p>
    <p>
      Go to{" "}
      <NavLink to={routes.HOME} className="underlined">
        home
      </NavLink>{" "}
      page.
    </p>
  </div>
);

export default PageNotFound;
