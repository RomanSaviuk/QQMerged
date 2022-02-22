import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import './Register.scss';
import { Link } from "react-router-dom";

export class Register extends Component {
    static displayName = Register.name;

    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: '' };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(event) {
        this.setState({ name: event.target.value });
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
            body: JSON.stringify({  name: this.state.name, email: this.state.email, password: this.state.password })
        };

        const response = await fetch('/register', requestOptions)

        window.open("/", "_self");
    }

    render() {

        return (
            <Container fluid>
                <div className="register_block">

                    <Col >
                        <div className="register_iteminput">

                            <div className="register_inputbox">

                                <Input type="text" value={this.state.name} onChange={this.handleNameChange} placeholder="Name" />
                            </div>

                            <div className="register_inputbox">

                                <Input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail" />
                            </div>

                            <div className="register_inputbox">

                                <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />

                            </div>
                            <div >
                                <a href="/createqueue" className="register_btn" onClick={this.handleSubmit}>Register</a>
                            </div>

                        </div>
                        


                    </Col>
                    



                </div>
            </Container>
        );
    }
}
