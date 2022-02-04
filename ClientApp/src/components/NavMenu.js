import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logIn = this.logIn.bind(this);
        this.state = { collapsed: true , logged: false};
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    logIn() {
        this.setState({ logged: true });
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-lg navbar-toggleable-md">
                    <Container fluid>
                        <Row className="width100">
                            <Col xs="3">
                                <NavbarBrand href="/">
                                    <NavLink tag={Link} className="adaptive_width" style={{ padding: "unset" }} to="/">
                                        <img src="/logo.svg" alt="" />
                                    </NavLink>
                                </NavbarBrand>
                            </Col>

                            <Col xs="9">
                                <NavbarToggler onClick={this.toggleNavbar} className="toggler_margin" />
                                <Collapse className="navbar-nav" isOpen={!this.state.collapsed} navbar>
                                    <Col xs="8">
                                        <ul className="navbar-nav">
                                            <NavItem>
                                                <NavLink tag={Link} to="/createqueue">Create Queue</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to="/myqueues">My Queues</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} to="/about">About</NavLink>
                                            </NavItem>
                                                
                                        </ul>
                                    </Col>

                                    <Col xs="4">
                                        <ul className="navbar-nav justify-content-end">
                                            <NavItem>
                                                <NavLink tag={Link} className="adaptive_width" to="/login">Log In</NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} className="adaptive_width" to="/account">
                                                    <div className="signup_button">Sign Up</div>
                                                </NavLink>
                                            </NavItem>
                                        </ul>
                                    </Col>
                                </Collapse>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
