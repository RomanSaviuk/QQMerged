import React, { Component } from 'react';
import { Container, Row, Col} from 'reactstrap';
import './GeneralQueue.scss';

export class GeneralQueue extends Component {
    static displayName = GeneralQueue.name;

    constructor(props) {
        super(props);
        this.state = { qname: "", queue: [], qstate: true, qdesc: "", loading: true};
    }

    componentDidMount() {
        this.qupdate();
    }

    async qupdate() {
        const response = await fetch('getqueuetest');
        const data = await response.json();
        this.setState({ queue: data, loading: false });
    }

    static renderQueueTable(queue) {
        return (
            <table className='table' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {queue.map(queue => <tr key={queue.name}> <td>{queue.name}</td> </tr>)}
                </tbody>
            </table>
        );
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : GeneralQueue.renderQueueTable(this.state.queue);
        let qname = "Queue"
        let qdesc = "oooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
        let qsize = 15
        return (
            <Container fluid>
                <div className="main_block">
                    {/*{contents}*/}
                    <Row>
                        <div className="queue_name">
                        </div>
                    </Row>

                    <Row className="queue_block">
                        <Col sm="8">
                            <div className="queue">
                            </div>
                        </Col>

                        <Col sm="4">
                            <Row className="buttons">
                                <Col sm="6" className="button">
                                    <div className="next_button">NEXT</div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue">{qsize}</div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue"></div>
                                </Col>
                                <Col sm="6" className="button">
                                    <div className="ppl_inqueue"></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}
