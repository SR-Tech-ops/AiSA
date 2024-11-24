import React from "react";
import { Link } from "react-router-dom";
import "../css/styles.css";
import "../css/images/logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Portal Pencegahan Jenayah Kewangan Nasional (NFCC)</div>
      <nav className="navbar">
        <Link to="/home">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/helpdesk">Helpdesk</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </header>
  );
};

export default Header;
