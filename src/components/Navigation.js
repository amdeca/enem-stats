import React, {Component} from 'react';
import { Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            school: props.school
        }
    }

    render(){
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand>{this.state.school.school_name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link eventKey="disabled">{this.state.school.type}</Nav.Link>
                    <Nav.Link eventKey="disabled">{this.state.school.city}</Nav.Link>
                    <Nav.Link eventKey="disabled">{this.state.school.state}</Nav.Link>
                </Nav>
                <Button variant="outline-success" href="/">Voltar</Button>

                {/* <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Ano" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    <Form inline>
                        <Button variant="outline-success" href="/">Voltar</Button>
                    </Form>
                </Navbar.Collapse> */}
                
            </Navbar>
        )
    }
}

export default Navigation;