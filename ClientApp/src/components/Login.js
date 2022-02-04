import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Login.css';

export class Login extends Component {
    static displayName = Login.name;

    render() {
        return (
            
            <div class = "flexbox">
              <div class="flexboxvert">
                  <form class="item" action="">
                    <input type="text" class="iteminput" placeholder ="E-mail or nickname" />
                  </form>
                  <form class="item" action="">
                    <input type="text" class="iteminput "placeholder = "Password" />
                  </form>
               </div>
               <div class="flexboxvert1">
                    <a href="/createqueue" className="btn btn-1 btn-sep icon-info">Login</a>
                    <a href="/forgotpass" className="btn2 forgotpass1">Forgot password?</a>
               </div>
         
            </div>
        );
    }
}
