import React from "react";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavbarMenu() {
  return (
    <Navbar mr={5} bg="dark" variant="dark" expand="sm" className="px-4">
      <LinkContainer to="/currencies">
        <Navbar.Brand>Home</Navbar.Brand>
      </LinkContainer>
    </Navbar>
  );
}
