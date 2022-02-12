import React, { Component } from 'react';
import {Input} from 'reactstrap';
import Cookies from 'js-cookie'
import './Login.css';

export class Login extends Component {
    static displayName = Login.name;

    constructor(props) {
        super(props);

        this.state = { email: '', password:''};

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
            body: JSON.stringify({email: this.state.email, password: this.state.password}) 
        };

        const response = await fetch('/login', requestOptions)
        const token = await response.text();

        Cookies.set('JWT', token, { path: '/' });

        window.open("/", "_self");
    }

    render() {
        return (
            
            <div class = "flexbox">
              <div class="flexboxvert">
                  <div className="input_email">
                    <Input type="text" className="iteminput" placeholder ="E-mail" value={this.state.email} onChange={this.handleEmailChange} />
                  </div>
                  <form class="item" action="">
                    <Input type="text" className="iteminput" placeholder ="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                  </form>
               </div>
               <div class="flexboxvert1">
                    <div className="btn btn-1 btn-sep icon-info" onClick={this.handleSubmit}>Login</div>
                    <a href="/forgotpass" className="btn2 forgotpass1">Forgot password?</a>
               </div>
         
            </div>
        );
    }
}

