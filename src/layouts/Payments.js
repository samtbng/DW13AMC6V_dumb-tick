import React, { Component } from 'react';
import Header from '../components/Header';
import PaymentsBody from '../components/Profile/PaymentsBody';
import Footer from '../components/Footer';

class Payment extends Component {

    

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                <Header />
                <PaymentsBody id={id} />
                <Footer />
            </div>
        )
    }
}

export default Payment