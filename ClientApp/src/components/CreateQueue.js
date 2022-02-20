import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'
import './CreateQueue.css';

export class CreateQueue extends Component {
    static displayName = CreateQueue.name;
    constructor(props) {
        super(props);

        this.state = { title: '' };
        this.handleTitleCreate = this.handleTitleCreate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTitleCreate(event) {
        this.setState({ title: event.target.value });
    }

    async handleSubmit(event) {
        const token = "Bearer " + Cookies.get('JWT');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                title: this.state.title
            })
        };

        const response = await fetch('/queue/create', requestOptions)
        const data = await response.json();

        this.props.history.push(`queue/${data.eventId}`);
        /*window.open("/", "_self");*/
    }

    render() {
        return (
            <div class="flexbox">
                <div class="flexboxver">
                    <form class="item" action="">
                        <input type="text" class="namequeue" value={this.state.title} onChange={this.handleTitleCreate} placeholder="Name your queue" />

                    </form>
                </div>
				<div className="btn">
					<a className="create_btn" onClick={this.handleSubmit}>Create queue</a>
                </div>
                <br></br>
				<a class="moreread">Instruction for creating and moderating queues:</a>
                <br></br><br></br>
				<section id="one" class="wrapper alt style2">
					<section class="spotlight">
						<div class="image"><img src="/pic01.jpg" alt="" /></div><div class="content">
							<h2>Step 1</h2>
							<p>Enter the name of your queue and click on the button</p>
						</div>
					</section>
					<section class="spotlight1">
						<div class="image1"><img src="/pic02.jpg" alt="" /></div><div class="content">
							<h2>Step 2</h2>
							<p>Then you are taken to a page where you can edit and manage the queue.<br></br>
                              On this page you can change the name of the queue, remove the user from the queue, specify that the next to come.		</p>
						</div>
					</section>
				</section>
				<br></br><br></br><br></br>
				<h2 align="center">Happy using!</h2>
				<br></br><br></br>
                </div>
        );
    }
}
