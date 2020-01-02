import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {
    TextField,
    Typography,
    Container,
    Button,
    FormControl,
    InputLabel,
    Select,
    Snackbar,
    IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import { connect } from 'react-redux'

import {API} from '../../_redux/type';
import { getCategory } from '../../_actions/categories'

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
    formContent:{
        margin:"5px"
    },
    button:{
        color:"white",
        background:"#FF5555",
        margin:'5px'
    }

}))

class AddEventBody extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            category: '',
            img: '',
            startTime: '',
            endTime: '',
            price: '',
            address: '',
            urlMap: '',
            description: '',
            openSnackbar:false,
            message:''
        }
    }

    componentDidMount() {
        this.props.dispatch(getCategory())
    }

    handleClose = () => {
        this.setState({ openSnackbar: false })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            title,
            category,
            img,
            startTime,
            endTime,
            price,
            address,
            urlMap,
            description } = this.state
        const { id } = this.props.login.data
        var config = {
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        }
        axios.post(`${API}/event`,
            {
                title: title,
                categoryId: category,
                img: img,
                startTime: startTime,
                endTime: endTime,
                price: price,
                address: address,
                urlMaps: urlMap,
                description: description,
                createdBy: id
            },
            config
        ).then(res => {
            console.log(res)
            this.setState({
                openSnackbar:true,
                message:"Berhasil menambahkan Event"
            })
            window.location.href = `/event/${res.data.id}`
        }).catch(err => { console.log(err) })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value })
    }

    render() {
        const { classes } = this.props
        const { data, isLoading } = this.props.categories
        return (
            <div className={classes.root}>
                <Container>
                    <Typography variant="h4" className={classes.title}>
                        Add Event
                </Typography>
                    <Container>
                        <form onSubmit={this.onSubmit} >
                            <div style={{ flex: 1, flexDirection: "column", display: "flex" }}>
                                <TextField
                                    id="standard-basic-title"
                                    label="title"
                                    value={this.state.title}
                                    onChange={this.handleChange('title')}
                                    required={true}

                                />

                                <FormControl>
                                    <InputLabel>Category</InputLabel>
                                    <Select
                                        native
                                        value={this.state.category}
                                        onChange={this.handleChange('category')}
                                    >
                                        <option value="" />
                                        {isLoading === false ?
                                            data.map(item =>
                                                <option value={item.id}>{item.name}</option>
                                            )
                                            :
                                            null
                                        }
                                    </Select>
                                </FormControl>

                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-image"
                                    label="image"
                                    value={this.state.img}
                                    onChange={this.handleChange('img')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-start-time"
                                    type="datetime-local"
                                    value={this.state.startTime}
                                    onChange={this.handleChange('startTime')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-end-time"
                                    type="datetime-local"
                                    value={this.state.endTime}
                                    onChange={this.handleChange('endTime')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-pricec"
                                    label="Price"
                                    value={this.state.price}
                                    onChange={this.handleChange('price')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-address"
                                    label="Address event"
                                    value={this.state.address}
                                    onChange={this.handleChange('address')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-url-maps"
                                    label="Url Map"
                                    value={this.state.urlMap}
                                    onChange={this.handleChange('urlMap')}
                                    required={true}
                                />
                                <TextField
                                    className={classes.formContent}
                                    id="standard-basic-description"
                                    label="description"
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    required={true}
                                />
                                <Button className={classes.button} type="submit" value="submit">PUBLISH</Button>

                            </div>
                        </form>
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
                    </Container>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        login: state.login,
        categories: state.categories
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(AddEventBody)) 