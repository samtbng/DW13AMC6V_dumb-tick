import React, { Component } from 'react';
import {
    Container,
    Typography,
    Grid,
    TextField
} from '@material-ui/core';
// import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';

import {API} from '../_redux/type';
import Category from './Category/Category'
import EventList from './Events/Content/EventList'
import { getEventsToday } from '../_actions/events';
import { getEventsTomorrow } from '../_actions/events';

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        background: "#F4E1E1"

    },
    container: {
        padding: "50px 0 50px 0"
    },
    growRow: {
        flex: 1,
        flexDirection: "row",
        display: "flex",
    },
    title: {
        fontWeight: "bold",
        color: '#FF5555',
    },
    content: {
        margin: "20px 0 20px 0",
    }

}))

class HomeBody extends Component {
    constructor(){
        super();
        this.state ={
            search:'',
            eventSearch:[]
        }
    }
    componentDidMount() {
        const date = moment(new Date()).format("YYYY-MM-DD")
        var tomorrow = new Date()
        tomorrow.setDate(moment(tomorrow.getDate() + 1))
        const date2 = moment(tomorrow).format("YYYY-MM-DD")

        this.props.dispatch(getEventsToday(date))
        this.props.dispatch(getEventsTomorrow(date2))
    }

    handleSearch = e => {
        const search = e.target.value
        this.setState({
            search: search
        })
        console.log(search)
            if(search){
            axios.get(`${API}/events/${search}/search`)
            .then(event => {
                this.setState({
                    eventSearch: event.data
                })
                console.log(this.state.eventSearch)
            }).catch(err => {
                console.log(err)
            })
        }
    }
    

    render() {
        const { classes } = this.props
        const { eventsToday, eventsTomorrow } = this.props
        return (
            <div className={classes.root}>
                <Container className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                id="standard-basic"
                                label="Search Title here"
                                type="search"
                                className={classes.growRow}
                                value={this.state.search}
                                onChange={this.handleSearch}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h5">
                                Category
                        </Typography>
                            <div>
                                <Category />
                            </div>
                        </Grid>
                        {this.state.search ? 
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h5">
                                Search: {this.state.search}
                            </Typography>
                            <div className={classes.content}>
                                <EventList data={this.state.eventSearch} />
                            </div>
                        </Grid>
                    :
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h5">
                                Today
                        </Typography>
                            <div className={classes.content}>
                                {eventsToday.isLoading ? null : <EventList data={eventsToday.data} />}
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography className={classes.title} variant="h5">
                                Upcoming
                            </Typography>
                            <div className={classes.content}>
                                {eventsTomorrow.isLoading ? null : <EventList data={eventsTomorrow.data} />}
                            </div>
                        </Grid>
                    </Grid>
                    }
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        eventsToday: state.eventsToday,
        eventsTomorrow: state.eventsTomorrow
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(HomeBody))