import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Navbar, Nav, NavDropdown, Container} from 'react-bootstrap';

const Navigate = () => {

    return(
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="#home">Rack & Strap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Need</Nav.Link>
                <Nav.Link href="#link">Got Room!</Nav.Link>
            </Nav>
            <Nav>
                <NavDropdown title="Profile" id="basic-nav-dropdown" className="ml-auto">
                    <NavDropdown.Item href="#action/3.1">
                        Profile & Settings
                    </NavDropdown.Item>
                    
                    <NavDropdown.Item href="#action/3.2">
                        My Posts
                    </NavDropdown.Item>
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Log Out
                    </NavDropdown.Item>
                </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
            
    );
}

export default Navigate;