import React from "react";
import { Container } from "react-bootstrap";
import NavbarMenu from "./Navbar";

export default function Layout(props) {
  return (
    <>
      <NavbarMenu />
      <Container> {props.children}</Container>
    </>
  );
}
