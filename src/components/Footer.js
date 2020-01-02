import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import {
    Grid,
    Typography,
    Container,
} from '@material-ui/core'

const useStyles = (theme => ({
    root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: "flex",
        padding: "50 px",
        background:"#FF5555",
        color:'white'
    },
    content: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    footerMid: {
        paddingLeft: "100px"
    }
}));

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Container style={{ padding: '50px 0px 50px 0px' }}>
                    <Grid container>
                        <Grid item xs={12} sm={4}>
                            <Typography>
                                dumb-tick is a web-base platform that provides tickets for various event around
                                sports, music, science, and gaming
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4} className={classes.footerMid}>
                            <div className={classes.footer}>
                                <Typography>
                                    Links
                                    </Typography>
                                <Typography>
                                    About us
                                    </Typography>
                            </div>
                            <div className={classes.footer}>

                                <Typography>
                                    Follow Us On
                                    </Typography>

                                <Typography>
                                    Instagram
                                    </Typography>

                                <Typography>
                                    Twitter
                                    </Typography>

                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography>
                                Have A Question?
                            </Typography>
                            <Typography>
                                Dumb-Tick
                            </Typography>
                            <Typography>
                                Email: support@dumbtick.com
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div >
        );
    }
}

export default withStyles(useStyles)(Footer)