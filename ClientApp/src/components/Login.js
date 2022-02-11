import React, { Component } from 'react';
import {Input} from 'reactstrap';
import './Login.css';

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
            /*body: JSON.stringify({email: this.state.email, password: this.state.password}) */
            body: JSON.stringify({email: "qqq12", password: "12312"}) 
        };

        const response = await fetch('/login', requestOptions)
        const data = await response.text();
        sessionStorage.setItem('token', data);

        sessionStorage.setItem('email', this.state.email);
        window.open("/", "_self");
    }

    render() {
        return (
            
            <div class = "flexbox">
              <div class="flexboxvert">
                  <div className="input_email">
                    <Input type="text" className="iteminput" placeholder ="E-mail" value={this.state.email} onChange={this.handleEmailChange} />
                  </form>
                  <form class="item" action="">
                    <Input type="text" className="iteminput" placeholder ="Password" value={this.state.password} onChange={this.handlePasswordChange} />
                    {/*<input type="text" class="iteminput "placeholder = "Password" />*/}
                  </form>
               </div>
               <div class="flexboxvert1">
                    <a href="/createqueue" className="btn btn-1 btn-sep icon-info" onClick={this.handleSubmit}>Login</a>
                    <a href="/forgotpass" className="btn2 forgotpass1">Forgot password?</a>
               </div>
         
            </div>
        );
    }
}
