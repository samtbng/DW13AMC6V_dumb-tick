import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { connect } from 'react-redux';
import {
    Container,
    Typography,
    Button,
    Divider,
    Avatar,
    Grid,
    Snackbar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
    Card,
    CardActionArea,
    CardMedia
} from '@material-ui/core/';
import moment from 'moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

import {API} from '../../_redux/type';
import EventIcon from '@material-ui/icons/Event';
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';

import { getDetailEvent } from '../../_actions/events';

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
    title2:{
        fontSize:"20px",
        fontWeight:"600",
        lineHeight:"22px",
        color:"rgba(0,0,0,0.84)",
        marginBottom:"10px"
    },
    content: {
        margin: "20px 0 20px 0",
    },
    border: {
        border: "2px black solid",
    },
    row: {
        flex: 1,
        display: 'flex',
        flexDirection: "row"
    },
    column: {
        flex: 1,
        display: 'flex',
        flexDirection: "column"
    },
    price: {
        fontWeight: 'bold',
        color:"#FF5555"
    },
    counter:{
        fontSize:"20px",
        fontWeight:'bold',
        margin:"5px 10px 0 10px"
    },
    counterButton:{
        background:"white",
        color:"#FF5555",
        fontSize:"30px",
        fontWeight:'bold',
        width:"30px",
        height:"30px",
        flex:1,
        display:'flex',
        flexDirection:"column",
        justifyContent:"center"
    },
    button:{
        background:"#FF5555",
        color:"white",
        marginLeft:"50px"
    },
    avatar: {
        width: "50px",
        height: "50px"
    },
    containerBorder: {
        padding: "20px 30px 30px 30px"
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    icon:{
        marginRight:"5px"
    },
    category:{
        fontSize:"24px",
        fontWeight:"200",
        lineHeight:'26px',
        color:"#FF5555"
    },
    content2:{
        color:"rgba(0,0,0,0.54)",
    }

}))


class DetailEvent extends Component {
    constructor() {
        super();
        this.state = {
            counter: 1,
            price: 0,
            openSnackbar:false,
            message:''
        }
    }

    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(getDetailEvent(id))
        setTimeout(() => {
            this.setState({
                price: this.props.eventDetail.data.price
            })
        }, 2000)
    }

    onClickPlus = () => {
        const { data } = this.props.eventDetail
        const counter = this.state.counter + 1
        this.setState({
            counter: counter,
            price: counter * data.price
        })
    }


    onClickMinus = () => {
        const { counter } = this.state
        const { data } = this.props.eventDetail
        if (counter > 1) {
            const counter = this.state.counter - 1
            this.setState({
                counter: counter,
                price: counter * data.price
            })
        }
    }

    handleClose = () => {
        this.setState({ openSnackbar: false })
    }

    buyHandle = () => {
        const { counter,price } = this.state
        console.log(counter)
        const { id } = this.props.eventDetail.data
        const { data } = this.props.login

        var config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        axios.post(`${API}/order`, {
            eventId: id,
            buyersId: data.id,
            quantity: counter,
            price: price,
            status: "pending"
        }, config).then(res => {
            this.setState({
                openSnackbar:true,
                message: "Pemesanan berhasil, silakan melakukan pembayaran pada halaman My Payments"
            })
            window.location.href = `/payment/${data.id}`
            console.log(res)
        }).catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props
        const { counter,price } = this.state
        const { isLoading, data } = this.props.eventDetail
        if (isLoading) { return null } else {
            const startedTime = moment(data.startTime).format("HH:mm")
            const endTime = moment(data.endTime).format("HH:mm")
            const startedDay = moment(data.startTime).format("DD MMMM")
            const endDay = moment(data.endTime).format("DD MMMM")

            return (
                <div className={classes.root}>
                    <Container stlye={{ padding: "50px 0px 50px 0px" }}>
                        <div style={{ border: "2px rgba(0,0,0,0.05) solid", marginBottom: "50px" }}>
                            <Card elevation={0}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        alt={data.title}
                                        image={`${data.img}`}
                                        title={data.title}
                                    />
                                </CardActionArea>
                            </Card>
                            <Container className={classes.containerBorder}>
                                <div className={classes.column}>
                                    <div className={classes.row}>
                                        <div className={classes.row}>
                                            <Typography variant="h4">
                                                {data.title}
                                            </Typography>
                                        </div>
                                        <div className={classes.row} style={{ justifyContent: "flex-end" }}>
                                            <Typography className={classes.price} variant="h4">
                                                {price === 0 ? 
                                                    <div>FREE</div>
                                                        :
                                                    <CurrencyFormat displayType={'text'} prefix="Rp." value={price} thousandSeparator={true} />
                                                }
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className={classes.row}>
                                        <div>
                                            <Typography className={classes.category}>
                                                {data.category.name}
                                            </Typography>
                                        </div>
                                        <div className={classes.row} style={{ justifyContent: "flex-end" }}>
                                            <Button onClick={this.onClickMinus}>
                                                <Typography className={classes.counterButton}> - </Typography>
                                            </Button>
                                            <Typography className={classes.counter}>{counter}</Typography>
                                            <Button onClick={this.onClickPlus}>
                                                <Typography className={classes.counterButton}> + </Typography>
                                            </Button>
                                            <Button className={classes.button} onClick={this.buyHandle}> BUY </Button>
                                        </div>
                                    </div>
                                    <Divider style={{margin:"20px 0 20px 0"}} />
                                    <div className={classes.row}>
                                        <div className={classes.column}>
                                            <Typography className={classes.title2}>Hosted By</Typography>
                                            <div className={classes.row}>
                                                <Link to={`/user/${data.CreatedBy.id}`}>
                                                    <Avatar
                                                        variant="square"
                                                        className={classes.avatar}
                                                        alt={data.CreatedBy.fullname}
                                                        src={data.CreatedBy.avatar}
                                                        title={data.CreatedBy.fullname}
                                                    />
                                                </Link>
                                                <div style={{ justifyContent: "center" }} className={classes.column}>
                                                    <Typography variant="h6">
                                                        <Link className={classes.link} to={`/user/${data.CreatedBy.id}`}>
                                                            {data.CreatedBy.fullname}
                                                        </Link>
                                                    </Typography>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.title2}>Date {`&`} Time</Typography>
                                            <Typography className={classes.content2}>
                                                <EventIcon className={classes.icon}/>
                                                {startedDay} - {endDay}
                                            </Typography>
                                            <Typography className={classes.content2}>
                                                <ScheduleIcon className={classes.icon}/>
                                                {startedTime} - {endTime}
                                            </Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.title2}>Contact Person</Typography>
                                            <Typography className={classes.content2}>
                                                <PersonIcon className={classes.icon}/>
                                                {data.CreatedBy.fullname}
                                            </Typography>
                                            <Typography className={classes.content2}>
                                                <CallIcon className={classes.icon}/>
                                                {data.CreatedBy.phone}
                                            </Typography>
                                            <Typography className={classes.content2}>
                                                <MailIcon className={classes.icon}/>
                                                {data.CreatedBy.email}
                                            </Typography>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div className={classes.row}>
                            <Grid container>
                                <Grid item xs={6} style={{ borderRight: "2px rgba(0,0,0,0.54) solid" }}>
                                    <div>
                                        <div className={classes.row} style={{justifyContent: "center" }}>
                                            <Typography className={classes.title2}>
                                                Event Description
                                     </Typography>
                                        </div>
                                        <div className={classes.row} style={{justifyContent: "center" }}>
                                            <Typography className={classes.content2}>
                                                {data.description}
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div >
                                        <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
                                            <Typography className={classes.title2}>
                                                Location
                                        </Typography>
                                        </div>
                                        <div style={{ display: 'flex', flex: 1, justifyContent: "center" }}>
                                            <Typography className={classes.content2}>
                                                <iframe
                                                    title="url maps"
                                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1982.9024251490532!2d106.77115732587467!3d-6.289362044580345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ee29a461fbb5%3A0x3b96bfd4238e7d91!2sLb.%20Bulus%2C%20Kec.%20Cilandak%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1577786048810!5m2!1sid!2sid"
                                                    width={400}
                                                    height={300}
                                                    frameBorder={0}
                                                    allowFullScreen={false}></iframe>
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div >
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
                                className={classes.close}
                                onClick={this.handleClose}
                            >
                                <CloseIcon />
                            </IconButton>]}
                         />
                    </Container >
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        eventDetail: state.eventDetail,
        login: state.login
    }
}
export default connect(mapStateToProps)(withStyles(useStyles)(DetailEvent))