import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './CreateQueue.css';

export class CreateQueue extends Component {
    static displayName = CreateQueue.name;

    render() {
        return (
            <div class="flexbox">
                <div class="flexboxvert">
                    <form class="item" action="">
                        <input type="text" class="iteminput" placeholder="Name your queue" />
                    </form>
                </div>
                <div>
                    <form action="">
                        <input class="formbutton" type="submit" value="Create queue" />
                    </form>
                </div>

            </div>
        );
    }
}
