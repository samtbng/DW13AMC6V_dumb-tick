import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    Divider,
    Button,
    TextField,
    Snackbar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';



import {API} from '../../../_redux/type';
import { getOrdersPending } from '../../../_actions/orders'

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 0 50px 0"
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
    button: {
        color: "white",
        background: "#FF5555",
        width: "100px",
        height: '40px'
    },
    subTitle: {
        fontSize: "20px",
        lineheight: "33px",
        fontWeight: "bold",
        color: "grey",
    },
    title: {
        fontWeight: "600",
        fontSize: "28px",
        fontHeight: "30px"
    },
    username: {
        fontWeight: "300",
        fontSize: "22px",
        fontHeight: "24px"

    },
}))



class PaymentList extends Component {
    constructor() {
        super();
        this.state = {
            attachment: ''
        }
    }

    handleConfirmed = () => {
        const { id, userId } = this.props
        const { attachment } = this.state
        var config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        axios.put(`${API}/order/${id}`, { attachment: attachment }, config)
            .then(res => {
                console.log(res)
                this.setState({
                    openSnackbar:true,
                    message:"pembayaran berhasil, mohon menunggu pembayaran anda terkonfirmasi"
                })
                this.props.dispatch(getOrdersPending(userId))

            }).catch(err => { console.log(err) })
            
        window.location.reload(false)
    }


    handleClose = () => {
        this.setState({ openSnackbar: false })
    }

    onChangeAttachment = (e) => {
        this.setState({ attachment: e.target.value })
    }


    render() {
        const {
            classes,
            fullname,
            userId,
            title,
            address,
            quantity,
            price,
            totalPrice,
            startTime,
            background
        } = this.props

        const infodate = new Date(startTime)
        const date = moment(infodate).format("ddd, DD MMM YYYY [at] HH:mm")
        return (
            <div>
                <Paper style={{ padding: "50px 100px 50px 100px", marginBottom: "40px" }}>
                    <div style={{  backgroundImage: `url(${background})`, border:"1px black solid",  padding: "30px 40px 30px 40px" }}>
                        <div className={classes.column} style={{ border:"1px black solid"}}>
                            <div className={classes.row} style={{ background: 'grey', padding: "10px 20px 10px 20px" }}>
                                <div className={classes.column}>
                                    <Typography className={classes.username}>
                                        {fullname}
                                    </Typography>
                                    <Typography>
                                        {userId}
                                    </Typography>
                                </div>
                                <div style={{ justifyContent: 'flex-end' }}>
                                    <Typography variant="caption">
                                        Face Value {price===0 ? 
                                            'FREE'
                                                :
                                            <CurrencyFormat displayType={'text'} prefix="Rp." value={price} thousandSeparator={true} />
                                        }
                                    </Typography>
                                </div>
                            </div>
                            <div className={classes.row} style={{ background: 'white', padding: "10px 20px 10px 20px" }}>
                                <div className={classes.column}>
                                    <Typography className={classes.title}>
                                        {title}
                                    </Typography>
                                    <Typography variant="caption">
                                        {date}
                                    </Typography>
                                    <Typography variant="caption">
                                        {address}
                                    </Typography>
                                </div>
                                <div style={{ flexDirection: "flex-end" }}>
                                    <img
                                        className={classes.barcode}
                                        variant="square"
                                        alt="barcode"
                                        title="barcode"
                                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ padding: "30px 20px 30px 20px" }}>
                        <Typography className={classes.subTitle}>
                            Shopping Summary
                        </Typography>
                        <div className={classes.row}>
                            <div>
                                <Typography>
                                    Total Price ({quantity} item)
                                </Typography>
                            </div>
                            <div className={classes.row} style={{ justifyContent: 'flex-end' }}>
                            {price===0 ? 
                                        <Typography>FREE</Typography>
                                            :
                                        <CurrencyFormat displayType={'text'} prefix="Rp." value={totalPrice} thousandSeparator={true} />
                            }
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div style={{ padding: "30px 20px 30px 20px" }}>
                        <div className={classes.row} >
                            <div className={classes.column} >
                                <Typography className={classes.subTitle}>
                                    Prove of Payment
                                </Typography>
                                <TextField
                                    id="standard-basic"
                                    label="attachment"
                                    value={this.state.attachment}
                                    onChange={this.onChangeAttachment}
                                />
                            </div>
                            <div className={classes.row} style={{ justifyContent: "flex-end" }}>
                                <Button className={classes.button} onClick={this.handleConfirmed}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left'
                    }}
                    autoHideDuration={1000}
                    open={this.state.openSnackbar}
                    message={this.state.message}
                    action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon />
                    </IconButton>]}
                />
            </div>
        );
    }
}

export default withStyles(useStyles)(PaymentList)