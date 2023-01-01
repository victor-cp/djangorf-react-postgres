import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar">
    <div className="container-fluid ">
      <Link className="navbar-brand" to="/">
        React / DJango Rest Framework / Postgres
      </Link>
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </nav>
);
