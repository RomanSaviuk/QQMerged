import React, { Component } from 'react';
import { Container, Row, Col, Input} from 'reactstrap';
import './Home.scss';

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
        alert('An id was submitted: ' + this.state.idQ);
        event.preventDefault();
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col sm="6">
                        <div className="input_id_block">
                            <div className="input_background_background">
                                <div className="input_background">
                                    <Input type="text" value={this.state.idQ} onChange={this.handleChange} placeholder="ID..."/>
                                </div>
                            </div>

                            <div className="submit_button">
                                <Input style={{color:"white"}} type="submit" value="Join" onClick={this.handleSubmit} />
                            </div>
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