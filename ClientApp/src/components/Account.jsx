import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Account.scss';

export class Account extends Component {
    static displayName = Account.name;

    render() {
        return (
            <div class="flexbox">
                <div class="flexboxvert">
                    <form class="item" action="">
                        <input type="text" class="iteminput" placeholder="Name" />
                    </form>
                    <form class="item" action="">
                        <input type="text" class="iteminput " placeholder="E-mail" />
                    </form>
                    <form class="item" action="">
                        <input type="text" class="iteminput " placeholder="Password" />
                    </form>
                </div>
                <div>
                    <form action="">
                        <input class="formbutton" type="submit" value="Change" />
                    </form>
                </div>

            </div>
        );
    }
}
