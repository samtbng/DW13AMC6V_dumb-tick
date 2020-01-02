import React, { Component } from "react";
import { withStyles } from '@material-ui/styles';
import {
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    Input,
    InputLabel,
    InputAdornment,
    IconButton,
    Snackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
        justifyContent: "justify"
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
            openRegis: false,
            openLogin: false,
            username: '',
            password: '',
            birthday:'',
            phone:'',
            email: '',
            fullname: '',
            showPassword: false,
            openSnackbar:false,
            message:''
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    handleCloseSnackbar = () => {
        this.setState({ openSnackbar: false })
    }

    handleClose = () => {
        this.setState(() => ({ openRegis: false }))
    }
    handleClickOpen = () => {
        this.setState(() => ({ openRegis: true }))
    }
    Reload = () => {
        this.location = window.location
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${API}/registration`, {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            fullname: this.state.fullname,
            birthday:this.state.birthday,
            phone:this.state.phone,
            avatar:this.state.fullname
        }).then(res => {
            localStorage.setItem('id', res.data.id)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isLogin', true)
            const token = localStorage.getItem('token')
            console.log("ini token : " + token)
            this.setState({
                openSnackbar:true,
                message:"Registration Success"
            })
            window.location.href = "/";
        }).catch(err => { console.log(err) })
    }

    render() {
        // if (this.props.login.isLoading) {
        //   this.loginBerhasil()
        // }
        const { classes } = this.props
        return (
            <div>
                <Button
                    style={{ color: "white" }}
                    onClick={this.handleClickOpen}
                    startIcon={<PersonAddIcon />}>
                    Register
                </Button>
                <Dialog
                    maxWidth="md"
                    className={classes.dialog}
                    open={this.state.openRegis}
                    onClose={this.handleClose}
                    aria-labelledby="customized-dialog-title"
                >
                    <div style={{ alignItems: "center" }}>

                        <div className={classes.middleBox}>
                            {/* <div className={classes.headerBox}> */}
                            <form onSubmit={this.handleSubmit} >
                                <DialogTitle id="customized-dialog-title">
                                    <Typography className={classes.headerText}>Register.</Typography>
                                </DialogTitle>
                                <DialogContent>

                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                        <FormControl>
                                            <InputLabel>Username</InputLabel>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="username"
                                                label="Username"
                                                type="text"
                                                minLength={6}
                                                maxLength={15}
                                                value={this.state.username}
                                                onChange={this.handleChange('username')}
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
                                                onChange={this.handleChange('password')}
                                                required
                                                inputProps={{ minLength: 8, maxLength: 16 }}
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
                                        <FormControl>
                                            <InputLabel>Email</InputLabel>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="email"
                                                type="email"
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                fullWidth
                                                required={true}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel>Full Name</InputLabel>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="fullname"
                                                type="text"
                                                value={this.state.fullname}
                                                onChange={this.handleChange('fullname')}
                                                fullWidth
                                                required={true}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="birthday"
                                                type="date"
                                                value={this.state.birthday}
                                                onChange={this.handleChange('birthday')}
                                                fullWidth
                                                required={true}
                                            />
                                        </FormControl>
                                        <FormControl>
                                            <InputLabel>Phone Number</InputLabel>
                                            <Input
                                                autoFocus
                                                margin="dense"
                                                id="phone"
                                                type="number"
                                                value={this.state.phone}
                                                onChange={this.handleChange('phone')}
                                                fullWidth
                                                required={true}
                                            />
                                        </FormControl>
                                    </div>

                                </DialogContent>
                                <div style={{ flexDirection: "row", justifyContent: "center" }}>
                                    <Button
                                        style={{ backgroundColor: "black", color: "white" }}
                                        type="submit"
                                        value="submit"
                                    >
                                        Registration
                                         </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={this.state.openSnackbar}
                        autoHideDuration={1000}
                        message={this.state.message}
                        action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleCloseSnackbar}
                        >
                            <CloseIcon />
                        </IconButton>]}
                    />
                </Dialog>
            </div >
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
