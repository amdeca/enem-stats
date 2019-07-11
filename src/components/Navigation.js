import React, {Component} from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';


class Navigation extends Component{
    constructor(props){
        super(props);
        this.state = {
            school: props.school
        }
    }

    render(){
        return (
            <Navbar bg="white" expand="lg" id="navigation">
                <Navbar.Brand>{this.state.school.school_name}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Nav className="mr-auto">
                    <Nav.Link eventKey="disabled">{this.state.school.type}</Nav.Link>
                    <Nav.Link eventKey="disabled">{this.state.school.city}</Nav.Link>
                    <Nav.Link eventKey="disabled">{this.state.school.state}</Nav.Link>
                </Nav>
                <Button variant="outline-success" href="/">Voltar</Button>
            </Navbar>
        )
    }
}

export default Navigation;