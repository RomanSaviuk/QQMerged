import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import { Virtuoso } from 'react-virtuoso';
import CustomScrollbar from "./CustomScroller";
import "overlayscrollbars/css/OverlayScrollbars.css";
import './GeneralQueue.scss';


export class GeneralQueue extends Component {
    static displayName = GeneralQueue.name;

    constructor(props) {
        super(props);
        this.state = { qname: "", queue: [], qstate: true, qdesc: "", loading: true, id: 0};
    }

    componentDidMount() {
        this.setState({ id: this.props.match.params.id });
        this.qupdate();
    }

    async qupdate() {
        const token = "Bearer " + sessionStorage.getItem('token');
        const requestOptions = {
            method: 'GET',
            headers: { 'Authorization': token }
        };

        const response = await fetch(`get_queue/${this.props.match.params.id}`, requestOptions);
        const data = await response.json();
        this.setState({ queue: data, loading: false });
    }

    alert(event) {
        alert('Button clicked');
    }

    render() {
        let queue = this.state.queue
        let qname = "Queue name with very long description"
        let qsize = this.state.queue.length
        let qid = this.state.id

        return (
            <Container fluid>
                <div className="main_block">
                    <Row>
                        <div className="queue_name">
                            {qname} {qid}
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
                                    itemContent={(index, Queue) => <div className="QItem" style={{backgroundColor: index == 0? "grey":"white"}}>{Queue.idUser}</div>}
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
