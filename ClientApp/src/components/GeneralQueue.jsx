import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import Cookies from 'js-cookie'

import { Virtuoso } from 'react-virtuoso';
import CustomScrollbar from "./CustomScroller";
import "overlayscrollbars/css/OverlayScrollbars.css";
import './GeneralQueue.scss';


export class GeneralQueue extends Component {
    static displayName = GeneralQueue.name;

    constructor(props) {
        super(props);
        this.state = { qname: "", queue: [], qonline: true, loading: true, id: this.props.match.params.id, isOdmen: false};
    }

    componentDidMount() {
        this.qupdate();
    }

    async qupdate() {
        const token = "Bearer " + Cookies.get('JWT');

        const qrequestOptions = {
            method: 'GET',
            headers: { 'Authorization': token }
        };

        const qownresp = await fetch(`IOwner/${this.state.id}`, qrequestOptions);
        const qown = await qownresp.json();
        this.setState({ isOdmen: qown});

        const qresponse = await fetch(`event/${this.state.id}`, qrequestOptions);
        const qdata = await qresponse.json();
        this.setState({ qname: qdata["title"], qonline: !qdata["isSuspended"]});


        const qlistresponse = await fetch(`get_queue/${this.state.id}`, qrequestOptions);
        const qlist = await qlistresponse.json();
        this.setState({ queue: qlist, loading: false });
    }

    alert(event) {
        alert('Button clicked');
    }

    render() {
        let queue = this.state.queue
        let qname = this.state.qname
        let qsize = this.state.queue.length
        let qid = this.state.id

        return (
            <Container fluid>
                <div className="main_block">
                    <Row>
                        <div className="queue_name">
                            {qname}
                            <div className="queue_edit_button" onClick={this.alert}>
                            </div>
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
                                    <div className="next_button" onClick={this.alert}>NEXT</div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue" onClick={this.alert}>{qsize}</div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue" onClick={this.alert}></div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue" onClick={this.alert}></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
