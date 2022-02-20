import React, { Component } from 'react';
import { Container, Row, Col, Input } from 'reactstrap';
import Cookies from 'js-cookie'
import './Login.css';
import { Link } from "react-router-dom";


export class Login extends Component {
    static displayName = Login.name;

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
        Cookies.set('Click', 0, { path: '/' });

        window.open("/", "_self");
        /*sessionStorage.setItem('id', data["idUser"]);*/
    }

    render() {

        


            return (
                <Container fluid>
                    <div className="mainbox">

                        <Col >
                            <div className="inputitem">



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
                                    <label class="checkbox_container">Remember me
                                        <input type="checkbox"/>
                                  
                                     
                                            <span class="checkmark"></span>   </label>

                                   
                                </Col>
                                <Col sm="6" className="btn">
                                    <div >
                                        <a className="login_btn" onClick={this.handleSubmit}>LogIn</a>
                                    </div>
                                </Col>
                                {/* <Col sm="6" className="btn">
                                <div className="login_register_btn">Register now</div>
                            </Col>*/}
                                <Col className="btn">
                                    <div >
                                        <a href="/forgotpass" className="forgotpass_btn" >Forgot password?</a>
                                    </div>
                                </Col>
                            </Row>
                        </Col>


                        <p> <span class="or_box" >────────────── or ───────────────</span></p>


                        <div className="google_btn" >
                            Sign in with Google
                                </div>

                      
                        
                                

                            
                      

                    </div>
                </Container>
            );
        }
    }
