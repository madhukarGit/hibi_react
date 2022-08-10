import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ApmPost from "./pages/ApmPost";
import Footer from "./pages/Footer";
import Header from "./pages/Header";

const App = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/apm" element={<ApmPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
