import React, { Component } from 'react';
import Header from '../components/Header';
import HomeBody from '../components/HomeBody';
import Footer from '../components/Footer';

class Home extends Component {

    render() {
        return (
            <div>
                <Header />
                <HomeBody />
                <Footer />
            </div>
        )
    }
}

export default Home