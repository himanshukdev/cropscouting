  //* *********************************************/
  //       Fullfilling Component Requirements.
  //* ********************************************/

// Library Imports
import React,{useState} from 'react';
import { useDispatch } from "react-redux";
import { Paper, Grid, TextField } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

// Custom Component Imports.
import LoginButton from "../../components/elements/LoginButton";

// Action Imports.
import {addNotes} from "../../store/actions/App";

  //* *********************************************/
  //       Start Styling component elements.
  //* ********************************************/
const useStyles = makeStyles((theme: Theme) => createStyles({
    margin: {
        margin: '30px 0px 20px',
        textAlign:'center'
    },
    paper2: {
        padding: theme.spacing.unit,
        position:'relative',
        top:'100px',
        overflow:'hidden'
        
    },
    floatingLabelFocusStyle:{
        color:'rgb(29 5 11)',
        '& label.Mui-focused': {
            color: 'rgb(29 5 11)',
          },
        '& label.Mui-error':{
        color:'#b7281e',
        },
        '& .MuiInputBase-inputMultiline':{
            overflowY:'hidden'
        }
    },
    titlePadding: {
        paddingBottom:'25px',
      },
    paddingT27:{
        paddingTop:'27px'
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
        height: '500px',
        backgroundImage:'linear-gradient(45deg, #427510, #f6c329)'
    }
  }));
  //* *********************************************/
  //       End Styling component elements.
  //* ********************************************/

  //* *********************************************/
  //       Component definition
  //* ********************************************/
  export default function Investigate(props){
    const classes = useStyles();
    const paperClass = paperStyles();
    const dispatch = useDispatch()

//managing internal state of component
    const [state,setState] = useState({
          name:"",
          dateOfNote:null,
          description:""
    });

    const [touched,setTouched] = useState({
          name: false,
          dateOfNote:false,
          description:false
    });

    const [error,setError] = useState("");

// form submit handling function checking form error while submitting notes to firestore
    const handleOnSubmit = () => {
        if(state.name && state.dateOfNote && state.description){
            // action dispatcher
            dispatch(addNotes(state));
            setState({
                name:"",
                dateOfNote:null,
                description:""
            });
            setTouched({
                ...touched,
                name: false,
                dateOfNote:false,
                description:false
            });
        }else{
            setTouched({
                ...touched,
                name: true,
                dateOfNote:true,
                description:true
            });
            setError("Please enter the required information.")
        }
            
    };

// input on chhnage handler.
    const InputChangehandler = (event) => {
        const {name,value} = event.target;
        setState({...state,[name]:value});
        setTouched({...touched,[name]:true});
        setError("");
    };
// dateOfNote Input Handlers
    const datePickerHandler = date => {
        setState({
          ...state,
          dateOfNote: date ? moment(date).format("MM/DD/YYYYY") : null
        });
        setTouched({...touched,dateOfNote:true});
        setError("");
      };
    

    //* *********************************************/
    //       Rendering Ui body
    //* ********************************************/
      return (
          <>
            <Paper 
                className={classes.paper2}
                classes={{
                    elevation1:paperClass.elevation1,
                    root:paperClass.root2
                }}
            >
                <div className={classes.margin}>
                <Typography variant="h6" classes={{root:classes.titlePadding}}>
                    Crop Scouting Form
                </Typography>
                    <Grid container spacing={1} justify="center" direction="column" >
                        <Grid item md>
                            <TextField
                                required
                                error={!state.name && touched.name}
                                classes={{root:classes.floatingLabelFocusStyle}}
                                id="officername"
                                label="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                name="name"
                                value={state.name}
                                variant="outlined"
                                onChange={InputChangehandler}
                            />   
                        </Grid>
                       
                            <Grid item md>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required
                                    error={!state.dateOfNote && touched.dateOfNote}
                                    classes={{root:classes.floatingLabelFocusStyle}}
                                    disableToolbar
                                    variant="outlined"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="dateofnote"
                                    label="Date Of Note"
                                    value={state.dateOfNote}
                                    onChange={datePickerHandler}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                </MuiPickersUtilsProvider>
                            </Grid>
                        
                        <Grid item md>
                            <div className={classes.paddingT27}>
                                <TextField
                                    error={!state.description && touched.description}
                                    required
                                    classes={{root:classes.floatingLabelFocusStyle}}
                                    id="description"
                                    label="Description"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    multiline
                                    rows="4"
                                    name="description"
                                    value={state.description}
                                    variant="outlined"
                                    onChange={InputChangehandler}
                                    /> 
                            </div>  
                            </Grid>
                        {error && (
                            <Grid container justify="center" style={{ marginTop: '15px',marginLeft:'3px' }}>
                                {error}
                            </Grid>
                        )}
                        <Grid container justify="center" style={{ marginTop: '15px',marginLeft:'3px' }}>
                            <LoginButton content="Save" handleSubmit={handleOnSubmit}/>
                        </Grid>
                    </Grid>
                </div>
            </Paper>
    </>
      );
  }