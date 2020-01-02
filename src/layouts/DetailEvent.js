import React, { Component } from 'react';
import Header from '../components/Header';
import DetailEventBody from '../components/Events/DetailEventBody';
import Footer from '../components/Footer';

class DetailEvent extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                <Header />
                <DetailEventBody id={id} />
                <Footer />
            </div>
        )
    }
}

export default DetailEvent