import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import './Login.css';
import { Link } from "react-router-dom";

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);
        this.state = { email: '', password:'' };

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
            /*body: JSON.stringify({email: "qqq12", password: "12312"})*/
        };

        const response = await fetch('/login', requestOptions)
        const data = await response.text();
        sessionStorage.setItem('token', data);
        sessionStorage.setItem('email', this.state.email);
        window.open("/", "_self");
    }

    render() {
        
            return (
                <Container fluid>
                    <div className="mainbox">

                        <Col >
                            <div className="inputitem">

                                <div  className="google_btn" >
                                    Sign in with Google 
                                </div>

                                <div className="inputbox">

                                    <Input type="text" value={this.state.email} onChange={this.handleEmailChange} placeholder="E-mail" />
                                </div>

                                <div className="inputbox">

                                    <Input type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder="Password" />

                                </div>

                            </div>

                            
                        </Col>
                        <Col >
                            <Row className="btns">
                                <Col sm="6" className="btn">
                                    <div className="remember_btn" >Remember me
                                        </div>
                                </Col>
                                <Col sm="6" className="btn">
                                    <div > 
                                        <a href="/createqueue" className="login_btn" onClick={this.handleSubmit}>LogIn</a>
                                    </div>
                                </Col>
                                <Col sm="6" className="btn">
                                    <div className="register_btn">Register now</div>
                                </Col>
                                <Col sm="6" className="btn">
                                    <div >
                                        <a href="/forgotpass" className="forgotpass_btn" >Forgot password?</a>
                                    </div>
                                </Col>
                            </Row>
                        </Col>

                       


                    </div>
                </Container>
        );
    }
}
