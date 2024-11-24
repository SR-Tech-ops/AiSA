import React from "react";
import Header from "../src/assets/components/Header";
import Footer from "../src/assets/components/Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main style={{ padding: "20px" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
