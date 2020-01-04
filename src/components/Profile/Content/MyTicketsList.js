import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import moment from 'moment'
import CurrencyFormat from 'react-currency-format';


const QRCode = require('qrcode.react');

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

class MyTicketsList extends Component {
    render() {
        const {
            classes,
            fullname,
            userId,
            title,
            address,
            totalPrice,
            startTime,
            background
        } = this.props
        console.log(background)
        const infodate = new Date(startTime)
        const date = moment(infodate).utc(false).format("ddd, DD MMM YYYY [at] HH:mm")
        return (
            <div>
                <Paper style={{ padding: "50px 100px 50px 100px" }}>
                    <div style={{ backgroundImage: `url(${background})`, border: "1px black solid", padding: "30px 40px 30px 40px" }}>
                        <div className={classes.column} style={{ border: "1px black solid" }}>
                            <div className={classes.row} style={{ background: "grey", padding: "10px 20px 10px 20px" }}>
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
                                        Face Value {totalPrice===0 ? 
                                            'FREE'
                                                :
                                            <CurrencyFormat displayType={'text'} prefix="Rp." value={totalPrice} thousandSeparator={true} />
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
                                <QRCode value={title}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            </div>

        );
    }
}

export default withStyles(useStyles)(MyTicketsList)