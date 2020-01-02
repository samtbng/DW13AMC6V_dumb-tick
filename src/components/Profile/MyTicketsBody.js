import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Container,
    Typography
} from '@material-ui/core';
import { connect } from 'react-redux';

import { getOrdersApproved } from '../../_actions/orders';
import MyTicketsList from './Content/MyTicketsList';

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 0 50px 0",
        background: "#F4E1E1"
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    barcode: {
        width: "150px",
        height: "150px"
    },
    title: {
        fontWeight: "bold",
        color: '#FF5555',
        paddingBottom: "50px"
    },
}))
class MyTicketsBody extends Component {
    constructor() {
        super();
        this.state = {
            orders: []
        }
    }
    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(getOrdersApproved(id))
    }

    render() {
        const { classes } = this.props
        const { isLoading, data } = this.props.ordersApproved
        // const { order, event, buyer } = this.state
        // const infodate = new Date(event.startTime)
        // const date = moment(infodate).format("DD MMMM YYYY")
        if (isLoading) {
            return <div><Typography>PLEASE WAIT</Typography></div>
        } else {
            console.log(this.props)
            return (
                <div className={classes.root}>
                    <Container>
                        <Typography className={classes.title} variant="h4">My Tickets</Typography>
                        {data.value === true ?
                            data.data.orders.map(item => {
                                return (
                                    < MyTicketsList
                                        key = { item.id }
                                        fullname = { data.data.fullname }
                                        userId = { data.data.id }
                                        id = { item.id }
                                        title = { item.event.title }
                                        address = { item.event.address }
                                        totalPrice = { item.price }
                                        startTime = { item.event.startTime }
                                        background = { item.event.category.image }
                                    />
                                    )
                            })
                            :
                            <Typography variant="h6" style={{ textAlign: 'center' }}>TIDAK ADA TIKET</Typography>
                        }
                    </Container>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ordersApproved: state.ordersApproved
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(MyTicketsBody))