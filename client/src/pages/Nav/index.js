import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";

import {login, logout} from "../../slice/loginSlice.js"
import {clearUserInfo} from "../../slice/authUserSlice.js"
import { Link, Navigate, Route, Routes, useNavigate, Switch } from 'react-router-dom';
// import Login from '../../loginComponent/Login.js';
import User from '../../userComponent/UserProfile';
import LandingPage from '../LandingPage/LandingPage.js';
import Home from '../Home/index.js'
import './index.css'

const NavigateBar = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const login_status = useSelector(state =>state.loginStateValue.value);

    const handleLogoutAction=(e)=>{
        e.preventDefault();
        console.log("trying to logout")
        dispatch(logout())
        dispatch(clearUserInfo())
        navigate('/landingPage')
    }

    const EmptyComponent = () =>{
        console.log("This should not render")
        return null;
    }
    /*----------- Conditional Rendering Here------------------------------*/
    if(login_status){
        return(
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/home">Rack & Strap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Need</Nav.Link>
                            <Nav.Link href="#link">Got Room!</Nav.Link> */}
                        </Nav>
                        
                        <Nav className='logged-in-view'>
                            <Nav.Link as={Link} to="/createpost">Create Post!</Nav.Link>
                            <NavDropdown title="Profile" id="basic-nav-dropdown" className="ml-auto">
                                <NavDropdown.Item as={Link} to='/userprofile'> Profile </NavDropdown.Item>
                                
                                <NavDropdown.Item href="#action/3.2">
                                    My Posts
                                </NavDropdown.Item>
                                
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogoutAction}>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>       
        );
    }else{

        /* Logged out state here*/ 
        return(
            <>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/landingPage">Rack & Strap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">

                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home">Need</Nav.Link>
                            <Nav.Link href="#link">Got Room!</Nav.Link> */}
                        </Nav>
                        {/* For loggin/signup */}
                        <Nav className='logged-out-view'>
                            <div className='custom-link'>
                                <Link to="/login">Login/Sign Up</Link>
                            </div>
                        </Nav>
                        
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
            </> 
        );
    }
}

export default NavigateBar;