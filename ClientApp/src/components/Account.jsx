import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Cookies from 'js-cookie'
import './Account.scss';
import { Link } from "react-router-dom";

export class Account extends Component {
    static displayName = Account.name;

    constructor(props) {
        super(props);

        this.state = { username: '', email: '', password: '', phone_number: '' };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }
    handleEmailChange(event) {
        this.setState({ email: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }
    handlePhoneChange(event) {
        this.setState({ phone_number: event.target.value });
    }
    async handleSubmit(event) {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.state.username, email: this.state.email, password: this.state.password,
                phone_number: this.state.phone_number
            })
        };

        const response = await fetch('/account', requestOptions)
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

                                <Input type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder="Username" />
                            </div>
                            <div className="inputbox">

                                <Input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail" />
                            </div>

                            <div className="inputbox">

                                <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />

                            </div>
                            <div className="inputbox">

                                <Input type="password" value={this.state.phone_number} onChange={this.handlePhoneChange} placeholder="Phone number" />

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

