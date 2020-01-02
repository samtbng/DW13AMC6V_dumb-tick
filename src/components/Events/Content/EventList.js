import React, { Component } from 'react';
import { Grid } from '@material-ui/core'
import EventCard from './EventCard'
import {connect }from 'react-redux'

class EventList extends Component {

    render() {
        const { data,login } = this.props
        return (
            <Grid container spacing={2}>
                {data.map(items => 
                    <EventCard
                    login={login.data}
                    id={items.id}
                    key={items.id}
                    title={items.title}
                    img= {items.img}
                    description={items.description}
                    price={items.price}
                    startTime={items.startTime}
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