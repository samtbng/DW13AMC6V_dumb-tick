import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { getCategory } from '../../_actions/categories';

const useStyles = (theme => ({
    // root: {
    //     flexGrow: 1,
    //     display: 'flex',
    //     justifyContent: "flex"
    // },
    // button: {
    //     margin: "0px 10px 0px 10px"
    // },
    link: {
        textDecoration: "none",
        color: 'black'
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
    },
    image: {
        position: 'relative',
        height: 40,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $imageBackdrop': {
                opacity: 0.15,
            },
            '& $imageMarked': {
                opacity: 0,
            },
            '& $imageTitle': {
                border: '2px solid currentColor',
            },
        },
    },
    focusVisible: {},
    imageButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    imageSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
        position: 'relative',
        padding: "0px 10px 0 10px"
    },
    imageMarked: {
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    },
}));

class Category extends Component {
    componentDidMount() {
        this.props.dispatch(getCategory())
    }

    render() {
        const { classes } = this.props
        const { isLoading, data } = this.props.categories
        if (isLoading) {
            return <div>

                <Typography>
                    PLEASE WAIT...
                    </Typography>
            </div>
        } else {
            return (
                <div className={classes.root}>
                    <Grid container>
                        {data.map(items =>
                            <Grid key={items.id} item xs={3} style={{padding:"5px 15px 5px 15px"}}>
                                <Link className={classes.link} to={`/category/${items.id}/events`}>
                                    <ButtonBase
                                        focusRipple
                                        key={items.title}
                                        className={classes.image}
                                        focusVisibleClassName={classes.focusVisible}
                                        style={{
                                            width: "100%"
                                        }}
                                    >
                                        <span
                                            className={classes.imageSrc}
                                            style={{
                                                backgroundImage: `url(${items.image})`,
                                            }}
                                        />
                                        <span className={classes.imageBackdrop} />
                                        <span className={classes.imageButton}>
                                            <Typography
                                                component="span"
                                                variant="subtitle1"
                                                color="inherit"
                                                className={classes.imageTitle}
                                            >
                                                {items.name}
                                                <span className={classes.imageMarked} />
                                            </Typography>
                                        </span>
                                    </ButtonBase>
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    }
}

export default connect(mapStateToProps)(withStyles(useStyles)(Category))
