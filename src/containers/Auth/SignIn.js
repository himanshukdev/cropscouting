//* *********************************************/
//       Fullfilling Component Requirements.
//* ********************************************/

// Library Imports
import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from "react-redux";
import { Paper, Grid, TextField } from '@material-ui/core';
import { Face, Fingerprint } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

// Custom Component Imports.
import LoginButton from "../../components/elements/LoginButton";
import {
    AlertMain,
    AlertBody,
    AlertTitle,
    AlertMessage,
    AlertButtonSection
  } from "../../components/elements/Alert";

import signincrop from "../../assets/images/signincrop.png";

// Action Imports.
import {login,resetFailedLoginStatus} from "../../store/actions/App";

  //* *********************************************/
  //        Styling component elements.
  //* ********************************************/
const useStyles = makeStyles((theme: Theme) => createStyles({
    margin: {
        margin: '50px 0px 20px',
        textAlign:'center'
    },
    paper2: {
        padding: theme.spacing.unit,
        position:'relative',
        top:'135px',
        overflow:'hidden'
    },
    floatingLabelFocusStyle:{
        color:'rgb(29 5 11)',
        '& label.Mui-focused': {
            color: 'rgb(29 5 11)',
          },
        '& label.Mui-error':{
            color:'#b7281e'
        },
    avtar:{
        height:'60px',
        width:'60px'
    }
    }
  }));

  const paperStyles = makeStyles((theme: Theme) => createStyles({
    elevation1:{
        boxShadow:'2px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    root2:{
        color: 'rgb(29 5 11)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        width: '28%',
        '@media(max-width: 750px)' : {
            width: '92%',
            marginLeft:"7px"
          },
        backgroundColor:'#d2551a3b',
        marginLeft: '529px',
        height: '400px',
        backgroundImage:'linear-gradient(45deg, #427510, #f6c329)'
       
    }
  }));

  //* *********************************************/
  //       Component definition
  //* ********************************************/
  export default function SignIn(props){
      const classes = useStyles();
      const paperClass = paperStyles();
      const dispatch = useDispatch();
      // Fetched From Redux
      const loginError = useSelector(state=>state.app.failedLoginStatus);
      const loginErrorMsg = useSelector(state=>state.app.failedLoginMessage);
      
      // Internal app state management.
      const [loginState,setLoginState] = useState({
          email:"",
          password:""
      });

      const [touched,setTouched] = useState({
          email:false,
          password:false
      });

      const [error,setError] = useState("")
      const [failedLoginAlert,setFailedLoginAlrt] = useState(false);
      
      useEffect(() => {
          if(loginError === "failed"){
            setFailedLoginAlrt(true);
          }
      }, [loginError]);

      // Input Change Handler
      const inputChangeHandler = (event) => {
        const {name,value} = event.target;
        setLoginState({
            ...loginState,
            [name]:value
        });
        setError("");
        setTouched({
            ...touched,
            [name]:true
        });
      }

      // Handling Login cred submission and validations.
      const handleLoginSubmit = () => {
          if(loginState.email && loginState.password){
            dispatch(login(loginState));
          }else{
            setTouched({
                ...touched,
                email:true,
                password:true
            });
            setError("Please enter required fields");
          }
    }

    // failed login handlers.
      const alertHandler = () => {
          setFailedLoginAlrt(false);
          dispatch(resetFailedLoginStatus());
          setLoginState({...loginState,email:"",password:""});
          setTouched({...touched,email:false,password:false});
      }
      
    //* *********************************************/
    //       Rendering Ui body
    //* ********************************************/
      return (
          <>
            {failedLoginAlert && (
                <AlertMain>
                <AlertBody>
                  <AlertTitle>
                    Oops...
                  </AlertTitle>
                  <AlertMessage>{loginErrorMsg}</AlertMessage>
                  <AlertButtonSection>
                    <LoginButton content="Ok" handleSubmit={alertHandler}/>
                  </AlertButtonSection>
                </AlertBody>
              </AlertMain>
            )}
            <Paper 
                className={classes.paper2}
                classes={{
                    elevation1:paperClass.elevation1,
                    root:paperClass.root2
                }}
            >
                <div className={classes.margin}>
                    <Grid container spacing={4} alignItems="center" justify="center">
                        <Grid item>
                            <Face />
                        </Grid>
                        <Grid item>
                            <TextField id="email" name="email" label="Email" type="email" value={loginState.email}  autoFocus required classes={{root:classes.floatingLabelFocusStyle}} onChange={inputChangeHandler} error={loginState.email ==="" && touched.email}/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4} alignItems="center" justify="center">
                        <Grid item>
                            <Fingerprint />
                        </Grid>
                        <Grid item  >
                            <TextField id="password" name="password" label="Password" type="password" value={loginState.password}  required classes={{root:classes.floatingLabelFocusStyle}} onChange={inputChangeHandler} error={loginState.password === "" && touched.password}/>
                        </Grid>
                    </Grid>
                    {error &&(
                        <Grid container justify="center" style={{ marginTop: '15px',marginLeft:'3px' }}>
                            {error}
                        </Grid>
                    )}
                    <Grid container justify="center" style={{ marginTop: '30px',marginLeft:'3px' }}>
                        <LoginButton content="Login" handleSubmit={handleLoginSubmit}/>
                    </Grid>
                    
                    <Grid container justify="center" style={{ marginTop: '40px',marginLeft:'3px' }}>
                        <Avatar alt="Remy Sharp" src={signincrop} classes={{root:classes.avtar}}/>
                    </Grid>
                </div>
            </Paper>
    </>
      );
  }