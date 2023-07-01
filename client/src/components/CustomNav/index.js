import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { userData } from "../../helpers";

const CustomNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { jwt } = userData();
  const isLoggedIn = !!jwt;

  return (
    <div className="custom-nav">
      <Navbar color="light" light expand="md" container>
        <NavbarBrand href="/" className="mr-auto">
          Stapi E-commerce
        </NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            {isLoggedIn ? (
              <NavItem>
                <NavLink href="/logout">Logout</NavLink>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default CustomNav;
