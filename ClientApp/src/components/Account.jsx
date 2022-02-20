import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Cookies from 'js-cookie'
import './Account.scss';
import { Link } from "react-router-dom";

export class Account extends Component {
    static displayName = Account.name;

    constructor(props) {
        super(props);

        this.state = { email: '', password: '' };

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    async handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email, password: this.state.password })
        };

        const response = await fetch('/login', requestOptions)
        const token = await response.text();

        Cookies.set('JWT', token, { path: '/' });

        window.open("/", "_self");
    }

    render() {

        return (
            <Container fluid>
                <div className="mainbox">

                    <Col >
                        <div className="inputitem">
                            <div className="inputbox">

                                <Input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="Username" />
                            </div>
                            <div className="inputbox">

                                <Input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail" />
                            </div>

                            <div className="inputbox">

                                <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />

                            </div>
                            <div className="inputbox">

                                <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Phone number" />

                            </div>
                        </div>


                    </Col>
                    <Col className="btn">
                        <br></br>      <div >
                            <a className="change_btn" onClick={this.handleSubmit}>Change</a>
                                </div>
                             </Col>

                </div>
            </Container>
        );
    }
}

