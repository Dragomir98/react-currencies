import React from "react";
import NavbarMenu from "./Navbar";

export default function Layout(props) {
  return (
    <>
      <NavbarMenu />
      {props.children}
    </>
  );
}
