import { NavLink } from "react-router-dom";
import Hamburger from "../assets/Hamburger.svg";
import SettingsIcon from "@mui/icons-material/Settings";
import "./Sidebar.css";
import styled from "@emotion/styled";

const StyledHomeIcon = styled(SettingsIcon, {
  name: "StyledHomeIcon",
  slot: "Wrapper",
})({
  color: "white",
  fontSize: "2rem",
  "&:hover": { color: "blue" },
});
const Sidebar = () => {
  return (
    <aside className="nav__side-nav">
      <NavLink to="/home" className="nav__side-nav-link">
        <img src={Hamburger} alt="hamburger" />
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "nav__side-nav-link--active" : "nav__side-nav-link"
        }
      >
        <StyledHomeIcon />
      </NavLink>
    </aside>
  );
};

export default Sidebar;
