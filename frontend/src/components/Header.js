import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root:{
        paddingTop:30
    },
    header_1:{
        color: '#182D42',
      
    },
    header_2:{
        
        color: 'grey'
    }
}));
function Header() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Container fixed>
            <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant="h3" align='center' className={classes.header_1}>
                        Automatic Text Summarizer
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Typography variant='subtitle1' align='center' className={classes.header_2}>
                        Multi-Language Summarizing AI Tool
                    </Typography>
                </Grid>


            </Grid>
                
                
            </Container>
        </div>
    )
}

export default Header
