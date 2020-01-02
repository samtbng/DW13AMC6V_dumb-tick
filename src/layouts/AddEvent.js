import React, { Component } from 'react';
import Header from '../components/Header';
import AddEventBody from '../components/Events/AddEventBody';
import Footer from '../components/Footer';

class AddEvent extends Component {

    render() {
        return (
            <div>
                <Header />
                <AddEventBody />
                <Footer />
            </div>
        )
    }
}

export default AddEvent