import { useState } from "react";
import ApmPost from "../pages/ApmPost";
import Main from "../pages/MainLogin";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  let values = window.location.href;
  let assetId = values.split("?")[1].split("=")[1];

  return (
    <section className="layout__grid">
      <div className="layout__grid-side-nav">
        <Sidebar />
      </div>
      <div className="layout__grid-side-main">
        <Main assetId={assetId} />
      </div>
    </section>
  );
};

export default Layout;
