import React, { Component } from 'react';
import Header from '../components/Header';
import MyTiketsBody from '../components/Profile/MyTicketsBody';
import Footer from '../components/Footer';

class MyTickets extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                <Header />
                <MyTiketsBody id={id}/>
                <Footer />
            </div>
        )
    }
}

export default MyTickets