import React from "react";
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { Link, Navigate, Route, Routes, useNavigate, Switch, NavLink } from 'react-router-dom';
import './index.css'

const Footer = () => {
    return(
            <>
            <div> {/* Parent container with centering */}
                <Navbar className="footer mt-auto w-100 fixed-bottom" bg="light" expand="lg"> {/* mt-auto pushes Navbar to the bottom */}
                    <div className="container-fluid"> {/* Use fluid container to make the Navbar span the width */}
                        {/* <Navbar.Brand as={Link} to="/about">About</Navbar.Brand> */}
                        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                        <Nav className="linkelements"> {/* Center the Nav links */}
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Nav.Link as={Link} to="/FAQ">FAQ</Nav.Link>
                            <Nav.Link as={Link} to="/terms">Terms</Nav.Link>
                            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                            <Nav.Link as={Link} to="/team">Team</Nav.Link>
                        </Nav>
                    </div>
                </Navbar>
            </div>
            </>      
    );
}

export default Footer;