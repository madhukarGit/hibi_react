import React from "react";
import "./Header.css";
import user from "../assets/download.png";

import { Menu } from "@mui/material";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="logo-section">
        <span className="logo-section__name">HITACHI</span>
        <div className="logo-section_vertical"></div>
        <span className="logo-section__name__location">HIBI</span>
      </div>
      <div className="header__tabs_span">
        <span className="tabs__child_tab">Overview</span>
        <span className="tabs__child_tab">Program</span>
        <span className="tabs__child_tab">Projects</span>
        <span className="tabs__child_tab">Tasks</span>
        <span className="tabs__child_tab">Reports</span>
        <span className="tabs__child_tab">Model Management</span>
        <span className="tabs__child_tab">Administration</span>
      </div>
      <div className="user-nav">
        {/* <span className="user_role">Operator</span> */}
        <img src={user} className="user-nav__user-photo" alt="user" />

        {/* <RiArrowDownSLine
          className="user-dropdown"
          id="demo-positioned-button"
          aria-controls={open ? "demo-positioned-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        /> */}
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {/* <div className="menu__item__selection">
            <MenuItem>Sr Admin</MenuItem>
            <MenuItem>adminxyz@gmail.com</MenuItem>
            <MenuItem
              sx={{ color: "#E85A4F" }}
              onClick={() => {
                handleClose();
              }}
            >
              Logout
            </MenuItem>
          </div> */}
        </Menu>
      </div>
    </header>
  );
};

export default Header;
