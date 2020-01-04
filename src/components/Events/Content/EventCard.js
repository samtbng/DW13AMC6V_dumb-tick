import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Paper, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {
    Card,
    CardActionArea,
    CardMedia
} from '@material-ui/core/';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import moment from 'moment';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';

import {API} from '../../../_redux/type';


const useStyles = (theme => ({
    card: {
        // maxWidth: 345,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    row: {
        flex: 1,
        display: "flex",
        flexDirection: "row"
    },
    column: {
        flex: 1,
        display: "flex",
        flexDirection: "column"
    },
    follow: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-end'
    },
    button: {
        width: "20px",
        height: '20px',
        fontSize: "12px",
        lineHeight: "13px"

    },
    icon: {
        border: "1px #FF5555 solid",
        color: "#FF5555",
        margin: "5px",
        padding: '5px',
        width: "40px",
        height: "40px",
    },
    price: {
        position: "absolute",
        top: 0,
        right: 0,
        background: "white",
        fontSize: "16px",
        margin: "8px",
        padding: '3px',
        fontWeight: "600",
        color: '#FF5555'
    },
    title: {
        fontSize: "18px",
        lineHeight: "20px",
        fontWeight: "600",
        color: "black"
    },
    date: {
        fontSize: "14px",
        lineHeight: "15px",
        fontWeight: "600",
        color: "#FF5555",
        marginBottom: "5px"
    }

}));
class EventCard extends Component {
    constructor() {
        super();
        this.state = {
            likes: false,
            id: 0,
            openSnackbar: false,
            message: ''
        }
    }
    componentDidMount() {
        setTimeout(() => {
            const { id } = this.props.login
            axios.post(`${API}/liked`,
                {
                    userId: id,
                    eventId: this.props.id
                })
                .then(res => {
                    const { likes, id } = res.data
                    this.setState({
                        likes: likes,
                        id: id
                    })
                    console.log(this.state.likes)
                    console.log(this.state.id)
                }).catch(err => { console.log(err) })
        }, 2000)
    }

    handleLikes = () => {
        const { id, likes } = this.state
        const { login } = this.props
        if (likes) {
            axios.delete(`${API}/likes/${id}`).then(res => {
                this.setState({
                    likes: false,
                    id: '',
                    openSnackbar: true,
                    message: 'You no longer favorited this event'
                })

            }).catch(err => {
                console.log(err)
            })
        } else {
            axios.post(`${API}/likes`,
                {
                    userId: login.id,
                    eventId: this.props.id
                }).then(res => {
                    this.setState({
                        id: res.data.id,
                        likes: true,
                        openSnackbar: true,
                        message: 'You favorite this event'
                    })
                }).catch(err => {
                    console.log(err)
                })
        }
    }

    handleClose = () => {
        this.setState({ openSnackbar: false })
    }

    render() {
        const { classes, id, title, img, description, startTime, price } = this.props
        const date = moment(new Date(startTime)).utc(false).format("DD MMMM")
        return (
            <Grid item xs={12} sm={4}>
                <Paper>
                    <Link to={`/event/${id}`} className={classes.link}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt={title}
                                    height="140"
                                    image={img}
                                    title={title}
                                />
                                <Typography className={classes.price}>
                                    {price===0 ? 
                                        <div>FREE</div>
                                            :
                                        <CurrencyFormat displayType={'text'} prefix="Rp." value={price} thousandSeparator={true} />
                                    }
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Link>
                    <div style={{ padding: "10px" }}>
                        <div className={classes.row} >
                            <div className={classes.column} style={{ justifyContent: 'center' }}>
                                {title.length > 20 ?
                                    <Typography className={classes.title} gutterBottom>
                                        {title.substring(0, 18) + "..."}
                                    </Typography>
                                    :
                                    <Typography className={classes.title} gutterBottom>
                                        {title}
                                    </Typography>
                                }
                            </div>
                            <div className={classes.follow} >
                                <IconButton onClick={this.handleLikes} className={classes.icon}>
                                    {this.state.likes ?
                                        <FavoriteIcon style={{ width: "25px", height: "25px" }} />
                                        :
                                        <FavoriteBorderIcon style={{ width: "25px", height: "25px" }} />
                                    }
                                </IconButton>
                            </div>
                        </div>
                        <Typography className={classes.date}>
                            {date}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
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
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon />
                        </IconButton>]}
                />
            </Grid>
        );
    }
}

export default withStyles(useStyles)(EventCard)