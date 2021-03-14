import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import logo from '../images/logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    brand:{
        marginLeft: -18,
        fontSize:37,
        paddingBottom:5,
        color: '#182D42',
    },
    logo: {
        maxWidth: 100,
        maxHeight:50,
    },
}));
function Navbar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color='transparent'>
                <Toolbar className={classes.appbar}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <Typography variant="h5" className={classes.brand} align='center'>
                        Temat
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
