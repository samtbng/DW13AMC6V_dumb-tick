import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Register from './Register';
import Login from './Login';
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import Dropdown from './Profile/Dropdown';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";


import { login } from '../_actions/login';

const useStyles = (theme => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
    },
    icon: {
        marginRight: "5px"
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    },
    fullname: {
        fontSize: "15px",
        fontWeight: "300",
        lineHeight: "17px",
        marginRight: "5px",
        color: 'white'
    }
}));

class Header extends Component {

    constructor() {
        super()
        this.state = {
            position: null,
            open: false,
            user: []
        }
    }

    componentDidMount() {
        // axios.get('http://localhost:8000/api/v1/user/' + localStorage.id).then(res => {
        //   this.setState({ user: res.data })
        // })
        if (localStorage.getItem('isLogin')) {
            const id = localStorage.getItem('id')
            this.props.dispatch(login(id))
        }
    }

    HandleMenu = (e) => {
        const target = e.currentTarget
        this.setState(() => ({ position: target }))
        this.setState({ open: true })

    };

    handleClose = () => {
        this.setState({ open: false })
    };


    render() {
        const { classes } = this.props
        const { data } = this.props.login
        return (
            <div className={classes.root}>
                <AppBar style={{ background: "#FF5555" }} color="inherit" position="static">
                    <Toolbar>

                        <Typography variant="h4" className={classes.title}>
                            <Link to="/" className={classes.link}>
                                DUMB-TICK
                                </Link>
                        </Typography>
                        {localStorage.getItem('isLogin') ?
                            <Button
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={event => { this.HandleMenu(event) }}
                                color="inherit"
                                style={{ textTransform: 'none', fontSize: '10px' }}
                            >
                                <Typography className={classes.fullname}>{data.fullname}</Typography>
                                <Avatar
                                    className={classes.clap}
                                    alt="Avatar"
                                    src={data.avatar}
                                />
                            </Button>

                            :

                            <div style={{ flexDirection: "row", display: "flex" }}>
                                <Register style={{ marginRight: "10px" }} />
                                <Login />
                            </div>
                        }
                        <Menu
                            id="menu-appbar"
                            anchorEl={this.state.position}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <Dropdown id={data.id} fullname={data.fullname} avatar={data.avatar} username={data.username} />
                        </Menu>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Header)) 
