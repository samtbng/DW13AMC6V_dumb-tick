import React, { Component } from 'react';
import Header from '../components/Header';
import EventsPerCategoryBody from '../components/Events/EventsPerCategoryBody';
import Footer from '../components/Footer';

class EventPerCategory extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                <Header />
                <EventsPerCategoryBody id={id} />
                <Footer />
            </div>
        )
    }
}

export default EventPerCategory