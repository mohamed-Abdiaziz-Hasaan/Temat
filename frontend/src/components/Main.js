import React,{useState} from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Slider from '@material-ui/core/Slider';
import useStyles from '../styles/maincss'
import Summarize from './Summarize'
import axios from 'axios';

function valuetext(value) {
    return `${value}°C`;
}
const data={
    "text":"",
    "percentage":0
}
function Main() {
    const classes = useStyles();
    const [currentcount,setCount]=useState(0)
    const [percentage,setpercentage]=useState(20)
    const [textvalue,settextvalue]=useState('')
    let [responseData, setResponseData] = React.useState(null);

    const handleinput=(event)=>{
        settextvalue(event.target.value)
        setCount(event.target.value.length)     
    }
    const clearbtn=()=>{
        setCount(0)
        settextvalue("")
    }
    const handleslider=(event,value)=>{
        setpercentage(value)
    }
    const handleaip=(data)=>{
        axios.post('http://127.0.0.1:8000/summary', data)
        .then(response => setResponseData(response.data))
        .catch(error => {
            console.error('There was an error!', error);
        })
        
    }
    const Summarizebtn=()=>{
        data.text=textvalue
        data.percentage=percentage
        if (textvalue.split(" ").length>50){
            handleaip(data)
            
        }
        else{
            alert("Please enter enough text to summarize.")
            
        }
        
    }
    
    const showdisplaybtn=textvalue.length > 0
    const isresponseData=responseData==null
    return (
      <div className={classes.root}>
        <Container fixed>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} lg={6} md={12} className={classes.card}>
              <Paper className={classes.paper}>
                <Grid container className={classes.header} spacing={1}>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle2"
                      
                    >
                      {showdisplaybtn
                        ? currentcount + " Characters"
                        : currentcount + " Character"}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle2">Summary Length</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Slider
                      defaultValue={30}
                      getAriaValueText={valuetext}
                      aria-labelledby="discrete-slider-small-steps"
                      step={10}
                      marks
                      min={20}
                      max={50}
                      valueLabelDisplay="off"
                      className={classes.slider}
                      onChange={handleslider}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      className={classes.btn}
                      size="small"
                      onClick={Summarizebtn}
                    >
                      Summarize
                    </Button>
                  </Grid>
                </Grid>
                <Divider />
                {showdisplaybtn && (
                  <DeleteOutlineRoundedIcon
                    className={classes.trash}
                    onClick={clearbtn}
                  />
                )}

                <TextareaAutosize
                  className={classes.textarea}
                  rowsMin={5}
                  placeholder="Paste or Write Text"
                  value={textvalue}
                  onChange={handleinput}
                />
              </Paper>
              
            </Grid>
            <Grid item xs={12} sm={12} lg={6} md={12} className={classes.card}>
              <Paper className={classes.paper}>
                {!isresponseData ? <Summarize responses={responseData} /> : ""}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
}

export default Main
