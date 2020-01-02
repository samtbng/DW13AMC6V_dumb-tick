import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import axios from 'axios';
import {API} from '../_redux/type';

const styles = theme => ({
    dialog: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

    },
    middleBox: {
        padding: "10px 16px",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    headerBox: {
        textAlign: "center"
    },
    headerText: {
        lineHeight: "36px",
        fontSize: "32px",
        margin: "0px"
    },
    middleUpperText: {
        fontSize: "12px",
    }
});
class Register extends Component {
    constructor() {
        super();
        this.state = {
            openLogin: false,
            password: '',
            email: '',
            showPassword: false
        }
    }
    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }
    handleClose = () => {
        this.setState(() => ({ openLogin: false }))
    }
    handleClickOpen = () => {
        this.setState(() => ({ openLogin: true }))
    }
    Reload = () => {
        this.location = window.location
    }

    changeEmail = (event) => {
        this.setState({ email: event.target.value })
    }

    changePassword = (event) => {
        this.setState({ password: event.target.value })
    }

    handleLogin = () => {
        alert("test")
        axios.post(`${API}/login`,
            {
                email: this.state.email,
                password: this.state.password
            }
        ).then(res => {
            if (res.data.login) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                localStorage.setItem('isLogin', true)
                console.log("ini token : " + localStorage.token)
                // window.location.reload(false);
            } else {
                window.location.reload(false)
                alert("EMAIL/PASSWORD SALAH")
                this.setState({ email: '' })
                this.setState({ password: '' })
            }
        }).catch(err => { console.log(err) })

    }

    render() {
        // if (this.props.login.isLoading) {
        //   this.loginBerhasil()
        // }
        const { classes } = this.props
        return (
            <div style={{ alignContent: "center" }}>
                <Button
                    style={{ color: "white" }}
                    onClick={this.handleClickOpen}
                    startIcon={<PersonIcon />}>
                    Login
                </Button>
                <Dialog
                    maxWidth="md"
                    style={{ minHeight: "550px" }}
                    className={classes.dialog}
                    open={this.state.openLogin}
                    onClose={this.handleClose}
                >
                    <div style={{ rootGrow: 1, padding: "50px" }}>
                        <div>
                            <DialogTitle id="customized-dialog-title">
                                Sign in
                                    </DialogTitle>
                            <DialogContent>
                                <form onSubmit={this.handleLogin}>
                                    <div style={{ flexDirection: "column", flex: 1, display: "flex" }}>
                                        <FormControl>
                                            <InputLabel>Email</InputLabel>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="email"
                                                type="email"
                                                value={this.state.email}
                                                onChange={this.changeEmail}
                                                fullWidth
                                                required={true}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel>Password</InputLabel>
                                            <Input
                                                id="standard-adornment-password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                value={this.state.password}
                                                onChange={this.changePassword}
                                                required
                                                inputProps={{ minLength: 8 }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPassword}
                                                        >
                                                            {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                        <div
                                            style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "20px" }}
                                        >
                                            <Button type="submit" value="submit" style={{ background: "black", color: "white" }}>
                                                Continue
                                                </Button>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </div>

                    </div>

                </Dialog >
            </div >
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
