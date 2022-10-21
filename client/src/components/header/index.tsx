import { NavLink } from "react-router-dom";
import routes from "../../utils/routes";
import "./styles.scss";

const Header = () => (
  <header>
    <NavLink to={routes.HOME} className="logo-link">
      <h1 className="logo">Swap</h1>
    </NavLink>
  </header>
);

export default Header;
