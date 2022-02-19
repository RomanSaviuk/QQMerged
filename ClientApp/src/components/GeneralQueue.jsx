import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Cookies from 'js-cookie'
import { Virtuoso } from 'react-virtuoso';
import CustomScrollbar from "./CustomScroller";
import "overlayscrollbars/css/OverlayScrollbars.css";
import './GeneralQueue.scss';
import {Link, Redirect, withRouter} from "react-router-dom";
import {AppContext} from './AppContext.jsx';

export class GeneralQueue extends Component {
    static displayName = GeneralQueue.name;

    constructor(props) {
        super(props);
        this.intervalID = 0;
        this.state = { qname: "", queue: [], qonline: true, loading: true, id: this.props.match.params.id, isOdmen: false, redirect: false, clicker: 0};

        this.handleNext = this.handleNext.bind(this);
        this.click = this.click.bind(this);
        this.handleFreeze = this.handleFreeze.bind(this);
    }

    componentDidMount() {
        this.intervalID = setInterval(() => { this.qupdate(); }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    async handleNext() {
        console.log("next");
        if (this.state.isOdmen) {

            const token = "Bearer " + Cookies.get('JWT');
            const requestOptions = {
                method: 'PUT',
                headers: { 'Authorization': token }
            };

            const response = await fetch(`/queue/${this.state.id}/moder/next`, requestOptions);

            if (response.ok) {
                this.qupdate();
            }
        }
        else {
            this.setState({ redirect: true });
        }
    }


    async handleFreeze() {
        if (this.state.isOdmen) {
            const token = "Bearer " + Cookies.get('JWT');
            const requestOptions = {
                method: 'PUT',
                headers: { 'Authorization': token }
            };


            if (this.state.qonline) {
                const response = await fetch(`/queue/${this.state.id}/moder/close`, requestOptions);
                if (response.ok) {
                    this.qupdate();
                }
            } else {
                const response = await fetch(`/queue/${this.state.id}/moder/open`, requestOptions);
                if (response.ok) {
                    this.qupdate();
                }
            }
        }
        else {
            this.setState({ redirect: true });
        }
    }


    async qupdate() {
        if (this.context["auth"]) {
            const token = "Bearer " + Cookies.get('JWT');

            const qrequestOptions = {
                method: 'GET',
                headers: { 'Authorization': token }
            };

            const qownresp = await fetch(`IOwner/${this.state.id}`, qrequestOptions);
            if (qownresp.ok) {
                const qown = await qownresp.json();
                this.setState({ isOdmen: qown });
            }

            const qresponse = await fetch(`event/${this.state.id}`, qrequestOptions);
            if (qresponse.ok) {
                const qdata = await qresponse.json();
                this.setState({ qname: qdata["title"], qonline: !qdata["isSuspended"] });
            }

            const qlistresponse = await fetch(`get_queue/${this.state.id}`, qrequestOptions);
            if (qlistresponse.ok) {
                const qlist = await qlistresponse.json();
                this.setState({ queue: qlist, loading: false });
            }
        }
        else {
            this.setState({ redirect: true });
        }
    }

    alert() {
        alert('Button clicked');
    }

    click() {
        this.setState({ clicker: this.state.clicker + 1 });
    }


    async qgen() {
        for (var i = 10; i < 100; i++) {
            const username = "user" + i;
            const email = username + "@gmail.com"
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "email": email,
                        "username": username,
                        "password": "11111111",
                        "phoneNumber": "11111111"
                    })
            };

            const response1 = await fetch('/register', requestOptions)
            const response2 = await fetch('/login', requestOptions)
            const token = await response2.text();
            const token2 = "Bearer " + token;
            const requestOptions2 = {
                method: 'POST',
                headers: { 'Authorization': token2 }
            };

            const response3 = await fetch('/queue/enter/6', requestOptions2)
            console.log(response3);
        }
    }

    render() {
        let queue = this.state.queue
        let qname = this.state.qname
        let qsize = this.state.queue.length
        let qid = this.state.id
        let clicker = this.state.clicker
        let isOdmen = this.state.isOdmen;
        let qstate = this.state.qonline;

        const Button1 = () => {
            if ( isOdmen ) {
                return <div className="next_button" onClick={this.handleNext}>NEXT</div>;
            } else {
                return <div className="join_button" onClick={this.alert}>JOIN</div>;
            }
        }

        const Button2 = () => {
            return <div className="ppl_inqueue">{qsize}</div>;
        }

        const Button3 = () => {
            if (isOdmen) {
                if (qstate) {
                    return <div className="freeze_button" onClick={this.handleFreeze}>Freeze<br />queue</div>;
                } else {
                    return <div style={{backgroundColor: "#CCCCCC"}} className="freeze_button" onClick={this.handleFreeze}>Freeze<br />queue</div>;
                }
            } else {
                return <div className="your_place" onClick={this.alert}>0<br />Your place</div>;
            }
        }

        const Button4 = () => {
            return <div className="clicker" onClick={this.click}>{clicker}<br />Click!</div>;
        }


        if (this.state.redirect) {
            return (<Redirect push to={`/`} />);
        }

        return (
            <Container fluid>
                <div className="main_block">
                    <Row>
                        <div className="queue_name">
                            <Row style={{width:"100%"}}>
                                <Col xs="9">
                                    {qname}
                                </Col>
                                <Col xs="3" className="col3_custom">
                                    <div className="copy_link_button" onClick={this.alert} data-toggle="tooltip" data-placement="top" title="Copy queue link">
                                    </div>
                                    <div style={{ backgroundColor: qstate ? "#82FF9D" : "#CCCCCC" }} className="queue_state">
                                    </div>
                                    <div className="queue_edit_button" onClick={this.alert} data-toggle="tooltip" data-placement="top" title="Edit queue">
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Row>

                    <Row className="queue_block">
                        <Col sm="8">
                            <div className="queue">
                                <Virtuoso
                                    components={{Scroller: CustomScrollbar}}
                                    className="QList"
                                    data={queue}
                                    itemContent={(index, Queue) => <div className="QItem" style={{backgroundColor: index == 0? "#82FF9D":"white"}}>{Queue.user}</div>}
                                />
                            </div>
                        </Col>

                        <Col sm="4">
                            <Row className="buttons">
                                <Col sm="6" className="button">
                                    {Button1()}
                                </Col>
                                <Col sm="6" className="button">
                                    {Button2()}
                                </Col>
                                <Col sm="6" className="button">
                                    {Button3()}
                                </Col>
                                <Col sm="6" className="button">
                                    {Button4()}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

GeneralQueue.contextType = AppContext;
export default withRouter(GeneralQueue);