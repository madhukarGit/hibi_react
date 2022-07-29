import Main from "../pages/MainLogin";
import Sidebar from "../sidebar/Sidebar";
import "./Layout.css";

const Layout = () => {
  console.log(window.location.href);
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
