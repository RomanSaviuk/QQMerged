import React, { Component } from 'react';
import { Container, Row, Col, Input} from 'reactstrap';
import './Home.scss';
import {Link} from "react-router-dom";

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = { idQ: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ idQ: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        window.open("/queue", "_self");
    }


    render() {
        let id = this.state.idQ

        return (
            <Container fluid>
                <div className="home_background"></div>
                <Row>
                    <Col sm="6">
                        <div className="input_id_block">
                            <div className="input_background_background">
                                <div className="input_background">
                                    <Input type="text" value={this.state.idQ} onChange={this.handleChange} placeholder="ID..."/>
                                </div>
                            </div>

                            <Link to={`queue/${id}`}>
                                <div className="submit_button">
                                    Join
                                </div>
                            </Link>
                        </div>
                    </Col>

                    <Col sm="6">
                        <div className="about_block">
                            <h1>Stop wasting time in queues</h1>
                            <h2>use smart queue service today</h2>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}