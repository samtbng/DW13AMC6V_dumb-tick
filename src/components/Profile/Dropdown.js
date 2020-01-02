import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import PaymentIcon from '@material-ui/icons/Payment';
import MenuItem from "@material-ui/core/MenuItem";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    link: {
        textDecoration: "none",
        color: "black"
    }

})
class ProfileDropdown extends Component {

    handleLogOut = () => {
        localStorage.clear();
        window.location.href="/";
    }

    render() {
        const { classes, id } = this.props
        return (
            <div style={{ width: "200px" }}>
                <Grid container direction="column" justify="flex-start">
                    <Grid>
                        <Link className={classes.link} to={`/user/${id}`}>
                            <MenuItem>
                                <AccountCircleIcon style={{ margin: "5px" }} />
                                Profile
                            </MenuItem>
                        </Link>
                        <Link className={classes.link} to={`/my_tickets/${id}`}>
                            <MenuItem>
                                <ConfirmationNumberIcon style={{ margin: "5px" }} />
                                My Ticket
                             </MenuItem>
                        </Link>
                        <Link className={classes.link} to={`/payment/${id}`}>
                            <MenuItem>
                                <PaymentIcon style={{ margin: "5px" }} />
                                Payment
                            </MenuItem>
                        </Link>
                        <Link className={classes.link} to="/add_event">
                            <MenuItem>
                                <EventAvailableIcon style={{ margin: "5px" }} />
                                Add Event
                            </MenuItem>
                        </Link>
                        <Link className={classes.link} to="/">
                            <MenuItem onClick={this.handleLogOut}>
                                <ExitToAppIcon style={{ margin: "5px" }} />
                                Log out
                            </MenuItem>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileDropdown)
