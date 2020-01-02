import React, { Component } from 'react';
import {
    Container,
    Typography,
    Grid,
    TextField,
} from '@material-ui/core';
// import SearchIcon from "@material-ui/icons/Search";
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { connect } from 'react-redux';

import EventList from './Content/EventList'
import { getEventsCategory } from '../../_actions/events';

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 0 50px 0",
        background: "#F4E1E1"
    },
    growRow: {
        flex: 1,
        flexDirection: "row",
        display: "flex",
    },
    title: {
        fontWeight: "bold",
        color: 'red',
    },
    content: {
        margin: "20px 0 20px 0",
    }

}))

class EventPerCategory extends Component {
    constructor() {
        super();
        this.state = {
            date: ''
        }
    }
    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(getEventsCategory(id))
    }

    handleChangeDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    render() {
        const { classes } = this.props
        const { isLoading, data } = this.props.eventCategory
        if (isLoading === false) {
            const filteredEvents = data.events.filter(item => {
                const filterStartTime = moment(new Date(item.startTime)).format("DD MMMM YYYY")
                const searchStartTime = moment(new Date(this.state.date)).format("DD MMMM YYYY")
                return (filterStartTime === searchStartTime)
            })

            console.log(this.state.date)
            return (
                <div className={classes.root}>
                    <Container>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography className={classes.title} variant="h5">
                                    {data.name}
                                </Typography>
                                <div>
                                    <Typography>
                                        Sort By:
                            </Typography>
                                    <TextField
                                        id="standard-basic-start-time"
                                        type="date"
                                        value={this.state.date}
                                        onChange={this.handleChangeDate}
                                    />
                                </div>
                                <div className={classes.content}>
                                    {this.state.date ?
                                        filteredEvents.length < 1 ?
                                            <Typography> DATA TIDAK DITEMUKAN</Typography>
                                            :
                                            <EventList data={filteredEvents} />
                                        :
                                        <EventList data={data.events} />
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            );
        } else {
            return (
                <div><Typography>PLEASE WAIT...</Typography></div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        eventCategory: state.eventCategory
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(EventPerCategory))