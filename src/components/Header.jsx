import { useState } from "react";
import delilogo from "../assets/images/logo-teal.svg";

function Header() {
  return (
    <>
      <div className="container">
        <img src={delilogo} alt="logo" />
      </div>
    </>
  );
}

export default Header;
