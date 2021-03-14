import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop:20,
        
    },
    paper: {
        padding: theme.spacing(0),
        color: theme.palette.text.secondary,  
        minHeight:500
    },
    btn:{
        backgroundColor:'#FF6600',
        color:'white',
        borderRadius:50,
        "&:hover": {
            backgroundColor: "#DF4423"
        },
        float:'right',
        marginRight:5  
    },
    card:{
        minheight:500,
        marginBottom:15
    },
    header:{
        display: 'flex',
        marginBottom:10,
        paddingTop:8,
        paddingLeft:10,
        align:'center'
        
    },
    text_reduce:{
        float:'right',
        marginRight:5 
        
    },
    trash:{
        float:'right',
        color: '#182D42',
        "&:hover": {
            color: '#000000',
            fontSize:23
        },
    },
    copy:{
        float:'right',
        paddingTop:3,
        paddingRight:3,
        "&:hover": {
            backgroundColor:"#FFFFFF"
        },
        
    },
    textarea:{
        width:'98%',
        fontSize:16,
        outline: 0,
        border:0,
        resize: 'none',
        backgroundColor:'#FFFFFF'
    },
    slider:{
        color: '#182D42',
    }
  
}));

export default useStyles