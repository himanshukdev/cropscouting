import React from "react";
import { ThemeProvider,makeStyles  } from '@material-ui/core/styles';

const theme = {
    background: 'linear-gradient(45deg, #627b0e 30%, #ddb826 90%)',
    hover:'linear-gradient(45deg, #ddb826 30%, #627b0e 90%)'
};

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.background,
        border: '3px solid #23590b',
        fontSize: 16,
        borderRadius: '10px',
        boxShadow: '0 3px 5px 2px rgb(42 67 33)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        textAlign:'center',
        width: '150px',
        cursor: 'pointer',
        '&:hover':{
            background: theme.hover
          }
    },
}));

  function ButtonChild({handleOnSubmit,content}) {
    const classes = useStyles();
  
    return (
        <button type="button" className={classes.root} onClick={handleOnSubmit}>
          {content}
        </button>
      );
  }
  
export default function LoginButton({handleSubmit,content}){
    return (
        <ThemeProvider theme={theme}>
            <ButtonChild handleOnSubmit={handleSubmit} content={content}/>
        </ThemeProvider>
    )
}