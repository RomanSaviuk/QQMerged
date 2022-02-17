import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Cookies from 'js-cookie'

import { Virtuoso } from 'react-virtuoso';
import CustomScrollbar from "./CustomScroller";
import "overlayscrollbars/css/OverlayScrollbars.css";
import './MyQueues.scss';


export class MyQueues extends Component {
    static displayName = MyQueues.name;

    constructor(props) {
        super(props);
        this.state = {
            qname: "", queue: [], qonline: true, loading: true, id: this.props.match.params.id,
            showContentJoined: true, showContentCreated: false
        };
        
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

        const joinedlistresponse = await fetch(`get_not_my_event`, qrequestOptions);
        const joinedlist = await joinedlistresponse.json();
        this.setState({ joinedlist: joinedlist, loading: false });


        const createdlistresponse = await fetch(`get_my_event`, qrequestOptions);
        const createdlist = await createdlistresponse.json();
        this.setState({
            createdlist: createdlist, loading: false });
    }

    alert(event) {
        alert('Button clicked');
    }

    joined() {
        //this.setState({ showContentJoined: !this.state.showContentJoined })
        this.setState(({ showContentCreated }) => ({ showContentCreated: false }))
        this.setState(({ showContentJoined }) => ({ showContentJoined: true }))

    }
    created() {
        //this.setState({ showContentCreated: !this.state.showContentCreated })
        this.setState(({ showContentJoined }) => ({ showContentJoined: false }))
        this.setState(({ showContentCreated }) => ({ showContentCreated: true }) )
    }

    render() {
        let joinedlist = this.state.joinedlist;
        let createdlist = this.state.createdlist;
        return (
            <Container fluid>
                <div className="list_mainblock">
                    <Row>
                        <div class="col padding-0" >
                            <div className="switch_btn" onClick={() => this.joined()}>Joined</div>
                        </div>
                        <div class="col padding-0">
                            <div className="switch_btn" onClick={() => this.created()}>Created</div>
                        </div>  

                    {this.state.showContentJoined ?
                            <div className="list">

                                <Virtuoso
                                    components={{ Scroller: CustomScrollbar }}
                                    className="EventList"
                                    data={joinedlist}
                                    itemContent={(index, Queue) => <div className="EventItem" >
                                        <div className="event_edit_button" onClick={this.alert}></div> </div>}
                                />
                            </div> : null}

                         
                   {this.state.showContentCreated ?
                        <div className="list">

                                <Virtuoso
                                    components={{ Scroller: CustomScrollbar }}
                                    className="EventList"
                                    data={createdlist}
                                    itemContent={(index, Queue) => <div className="EventItem"> 
                                        <div className="trash_btn_box" onClick={this.alert}>
                                            <img src="/trash-icon 1.svg" alt="" />
                                        </div>

                                    </div>}
                                />
                            </div> : null}  
                   </Row>
                </div>
                </Container>
                 
        );
    }
}



