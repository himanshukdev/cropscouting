/* eslint-disable react-hooks/exhaustive-deps */
//* *********************************************/
//       Fullfilling Component Requirements.
//* ********************************************/

// Library Imports
import React,{useEffect} from "react";
import { useSelector ,useDispatch} from "react-redux";
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Component Imports
import Header from "../../components/elements/AppBar";
import InvestigatingForm from "../../containers/Crop/Investigate";

// Action Imports
import {FetchNotes,resetNoteAddStatus} from "../../store/actions/App";
// Welcome Home Component.

  //* *********************************************/
  //       Start Styling component elements.
  //* ********************************************/
const useStyles = makeStyles((theme: Theme) => createStyles({
 toastBody:{
  backgroundImage:'linear-gradient(45deg, #627b0e 30%, #ddb826 90%)',
  color:'#ddd',
  fontSize:'20px',
  fontWeight:'700px'
 }
}));

  //* *********************************************/
  //       Component definition
  //* ********************************************/
export default function Home(props) {
  const classes = useStyles()
  const dispatch = useDispatch();

  // Fetched from Redux.
  const noteAddstatus = useSelector(state=>state.app.noteAddstatus);


  useEffect(() => {
    dispatch(FetchNotes());
  }, []);

  useEffect(() => {
    if(noteAddstatus === "success"){
      dispatch(resetNoteAddStatus());
      toast("Note was added successfully!")
    }
  }, [noteAddstatus]);
  //* *********************************************/
  //       Rendering Ui Body definition
  //* ********************************************/
  return (
        <>
            <Header history={props.history } context="Scouting"/>
            <ToastContainer autoClose={1500} toastClassName ={classes.toastBody}/>
            <InvestigatingForm/>
        </>
    );
}
