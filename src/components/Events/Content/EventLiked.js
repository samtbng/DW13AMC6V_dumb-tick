import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import EventCard from './EventCard'

class EventList extends Component {

    render() {
        const { data, login } = this.props
        return (
            <Grid container spacing={2}>
                {data.map(items =>
                    <EventCard
                        login={login.data}
                        id={items.eventsLiked.id}
                        key={items.eventsLiked.id}
                        title={items.eventsLiked.title}
                        img={items.eventsLiked.img}
                        description={items.eventsLiked.description}
                        price={items.eventsLiked.price}
                        startTime={items.eventsLiked.startTime}
                    />
                )}
            </Grid>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
    }
}


export default connect(mapStateToProps)(EventList)