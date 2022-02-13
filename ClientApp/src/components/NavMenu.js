import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink, Row, Col} from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import './NavMenu.css';


export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = { collapsed: true , authorized: false, username: ""};
    }

    toggleNavbar() {
        this.setState({collapsed: !this.state.collapsed});
    }

    componentDidMount() {
        this.update();
    }

    async update() {
        if (Cookies.get('JWT') !== undefined) {

            const token = "Bearer " + Cookies.get('JWT');

            const requestOptions = {
                method: 'GET',
                headers: { 'Authorization': token }
            };

            const response = await fetch('/my_account', requestOptions);

            if (response.ok) {
                const data = await response.json();
                sessionStorage.setItem('id', data["idUser"]);
                this.setState({ authorized: true, username: data["username"]});
            }
        }
    }

    render() {
        let authorized = this.state.authorized;
        let username = this.state.username;

        const renderLogauntButton = () => {
            if ( authorized ) {
                return <NavLink tag={Link} className="adaptive_width" to="/account">{username}</NavLink>;
            } else {
                return <NavLink tag={Link} className="adaptive_width" to="/login">Log In</NavLink>;
            }
        }

        const renderSignauntButton = () => {
            if ( authorized ) {
                return <NavLink tag={Link} className="adaptive_width" to="/account"><div className="signup_button">Account</div></NavLink>;
            } else {
                return <NavLink tag={Link} className="adaptive_width" to="/account"><div className="signup_button">Sign Up</div></NavLink>;
            }
        }

        return (
            <header>
                <Navbar className="navbar-expand-lg navbar-toggleable-md">
                    <Container fluid>
                        <Row className="width100">
                            <Col xs="3">
                                <NavbarBrand>
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
                                        <ul className="navbar-nav justify_end">
                                            <NavItem>
                                                {renderLogauntButton()}
                                            </NavItem>
                                            <NavItem>
                                                <NavLink tag={Link} className="adaptive_width" to="/register">
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
