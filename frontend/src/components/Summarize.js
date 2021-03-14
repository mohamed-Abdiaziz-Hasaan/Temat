import React ,{useState,useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styles/maincss";
import Divider from "@material-ui/core/Divider";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
function Summarize(props) {
  const classes = useStyles();
  const [textvalue,settextvalue]=useState("")
  const handleinput=(event)=>{
    settextvalue(event.target.value)  
  }
  useEffect(()=>{
    settextvalue(props.responses.Text)
  },[props.responses])
  const handleCopy=()=>{
    //   navigator.clipboard.writeText(textvaluey)
      console.log(textvalue)
  }
  return (
    <div>
      <Grid container spacing={1} className={classes.header}>
        <Grid item xs={4}>
          <Typography variant="subtitle2">
            {props.responses.Language}
          </Typography>
        </Grid>

        <Grid item xs={4}>
          {props.responses.Sentence} Sentences
        </Grid>

        <Grid item xs={4}>
          <Typography variant="subtitle2" className={classes.text_reduce}>
            Text Reduce to {props.responses.Reduced}
          </Typography>
        </Grid>
      </Grid>
      <Divider />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={classes.copy}
        onClick={() => {navigator.clipboard.writeText(textvalue);alert("Text Copied!")}}
      >
        <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
      </svg>

      <TextareaAutosize className={classes.textarea} rowsMin={5} value={textvalue} onChange={handleinput}/>
    </div>
  );
}

export default Summarize;
