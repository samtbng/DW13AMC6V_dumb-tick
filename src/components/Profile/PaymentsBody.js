import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {
    Container,
    Typography,
} from '@material-ui/core'
import { connect } from 'react-redux'

import PaymentList from './Content/PaymentList';
import { getOrdersPending } from '../../_actions/orders'

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 0 50px 0",
        background: "#F4E1E1"
    },
    title: {
        fontWeight: "bold",
        color: '#FF5555',
        paddingBottom: "50px"
    },
}))
class PaymentsBody extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            user: [],
        }
    }

    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(getOrdersPending(id))
    }

    render() {
        const { classes } = this.props
        const { isLoading, data } = this.props.ordersPending
        if (isLoading === false) {
            return (
                <div className={classes.root}>
                    <Container>
                        <Typography className={classes.title} variant="h4">Payment</Typography>
                        {data.value===true ?
                            data.data.orders.map(item =>
                                <PaymentList
                                    key={item.id}
                                    fullname={data.data.fullname}
                                    userId={data.data.id}
                                    id={item.id}
                                    title={item.event.title}
                                    address={item.event.address}
                                    quantity={item.quantity}
                                    price={item.event.price}
                                    totalPrice={item.price}
                                    startTime={item.event.startTime}
                                    background={item.event.category.image}
                                    status={item.status}
                                    attachment={item.attachment}
                                />
                        )
                        :
                        <Typography variant="h6" style={{textAlign:'center'}}>TIDAK ADA PEMBAYARAN SAAT INI</Typography>
                        }
                    </Container>
                </div>
            );
        } else {
            return <div><Typography></Typography></div>
        }
    }
}

const mapStateToProps = (state) => {
    return {
        ordersPending: state.ordersPending
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(PaymentsBody))