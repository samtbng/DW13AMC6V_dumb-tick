import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
    Typography,
    Button,
    Avatar,
    FormControl,
    InputLabel,
    Input,
    TextField,
    Snackbar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import {connect} from 'react-redux'
import moment from 'moment'


import {API} from '../../_redux/type';
import EventLiked from '../Events/Content/EventLiked';
import {getProfile} from "../../_actions/login";

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 150px 50px 150px",
        background: "#F4E1E1",
    },
    profileTitle:{
        fontSize:"40px",
        fontWeight:"600",
        lineHeight:"45px",
        color:"#FF5555"
    },
    userFullname:{
        fontSize:"35px",
        fontWeight:"600",
        lineHeight:"40px",
    },
    userProfile:{
        fontSize:"20px",
        fontWeight:"300",
        lineHeight:"30px",

    },
    button:{
        color:"white",
        background:"#FF5555",
        margin:'5px'
    },
    column:{
        flex: 1,
        display: 'flex',
        flexDirection: "column"
    },
    row:{
        flex: 1,
        display: 'flex',
        flexDirection: "row"
    },

}))


class ProfilePage extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            events: [],
            isUser:false,
            isEdit:false,
            fullname:'',
            phone:'',
            birthday:'',
            email:'',
            openSnackbar:false,
            message:'',
        }
    }
    componentDidMount() {
        const { id } = this.props
        this.props.dispatch(getProfile(id))

        setTimeout(() =>{
            const { data } = this.props.profile
            const dataLogin = this.props.login.data
            if(data.id === dataLogin.id){
            this.setState({
                isUser:true,
                fullname : data.fullname,
                birthday : data.birthday,
                phone : data.phone,
                email : data.email,
                })
            }
        },2000)
    }
    
    handleClick = () => {
        this.setState({
            isEdit:true,
            isUser:false
        })
    }

    
    handleCloseSnackbar = () => {
        this.setState({ openSnackbar: false })
    }

    
    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }


    handleSubmit = () => {
        const {id} = this.props.login.data
        const {
            fullname,
            phone,
            birthday,
            email
        } = this.state
        var config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        axios.put(`${API}/user/${id}`,
        {
            fullname:fullname,
            phone:phone,
            birthday:birthday,
            email:email
        }, config).then(res => {
            this.setState({
                openSnackbar:true,
                message:"Berhasil update profile"
            })
        }).catch(err=>{
            console.log(err)
            this.setState({
                openSnackbar:true,
                message:"Gagal update profile"
            })
        })
    }

    render() {
        const {classes} = this.props
        const { isLoading,data } = this.props.profile
        if(isLoading){
            return(
                <div><Typography>PLEASE WAIT...</Typography></div>
            )
        } else {
            const date = moment(new Date(data.birthday)).format("DD-MM-YYYY")
        return (
            <div className={classes.root}>
                <Typography className={classes.profileTitle}>
                    Profile 
                </Typography>
                <div className={classes.row} style={{ paddingBottom: "50px" }}>
                    {this.state.isEdit ? 
                        <form onSubmit={this.handleSubmit} className={classes.row}>
                            <div className={classes.column}>
                                <FormControl>
                                    <InputLabel>Fullname</InputLabel>
                                    <Input
                                        autoFocus
                                        margin="dense"
                                        id="fullname"
                                        type="text"
                                        minLength={6}
                                        maxLength={15}
                                        value={this.state.fullname}
                                        onChange={this.handleChange('fullname')}
                                        fullWidth
                                        required={true}
                                    />
                                </FormControl>
                                
                                <TextField
                                    id="standard-basic-start-time"
                                    type="date"
                                    value={moment(this.state.birthday).format("YYYY-MM-DD")}
                                    onChange={this.handleChange('birthday')}
                                    fullWidth
                                    required={true}
                                />
                                <FormControl>
                                    <InputLabel>Phone</InputLabel>
                                    <Input
                                        margin="dense"
                                        id="phone"
                                        type="text"
                                        value={this.state.phone}
                                        onChange={this.handleChange('phone')}
                                        fullWidth
                                        required={true}
                                    />
                                </FormControl>
                                <FormControl>
                                    <InputLabel>Email</InputLabel>
                                    <Input
                                        margin="dense"
                                        id="email"
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                        fullWidth
                                        required={true}
                                    />
                                </FormControl>
                                
                            </div>
                            <div>
                                <Button className={classes.button} type="submit">Save Edit</Button>
                            </div>
                        </form>
                            :
                        <div className={classes.column}>
                            <div className={classes.row}>
                                <Typography className={classes.userFullname}>
                                    {data.fullname}
                                </Typography>
                            </div>
                            <Typography className={classes.userProfile}>
                                {date}
                            </Typography>
                            <Typography className={classes.userProfile}>
                                {data.phone}
                            </Typography>
                            <Typography className={classes.userProfile}>
                                {data.email}
                            </Typography>
                        </div>
                    }
                    {this.state.isUser ? 
                        <div>
                            <Button className={classes.button} onClick={this.handleClick}>Edit Profile</Button>
                        </div>
                            :
                        null
                    }
                    <div>
                        <Avatar
                            alt={data.fullname}
                            style={{ width: "150px", height: "150px" }}
                            src={data.avatar}
                        />
                    </div>
                </div>
                <div>
                    <Typography variant="h5" style={{ fontWeight: "bold", marginRight: "15px" }}>
                        Favorite
                    </Typography>
                    <EventLiked data={data.likes} />
                </div>
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
            </div >
        )
    }
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        login: state.login
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(ProfilePage))
