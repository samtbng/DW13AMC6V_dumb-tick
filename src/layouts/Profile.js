import React, { Component } from 'react';
import Header from '../components/Header';
import ProfileBody from '../components/Profile/ProfileBody';
import Footer from '../components/Footer';

class Profile extends Component {

    render() {
        const { id } = this.props.match.params
        return (
            <div>
                <Header />
                <ProfileBody id={id} />
                <Footer />
            </div>
        )
    }
}

export default Profile