  //* *********************************************/
  //       Fullfilling Component Requirements.
  //* ********************************************/

import React from 'react';
import {useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import moment from "moment";

import signincrop from "../../assets/images/signincrop.png";
import Header from "../../components/elements/AppBar";

  //* *********************************************/
  //        Styling component elements.
  //* ********************************************/
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  inline: {
    display: 'inline',
  },
  floating:{
    float:'right'
  }
}));

  //* *********************************************/
  //       Component definition
  //* ********************************************/
export default function ScoutingList(props) {
  const classes = useStyles();
  const cropNotes = useSelector(state=>state.app.scoutNotes);

  return (
      <>
      <Header history={props.history} context="Listing"/>
        <List className={classes.root}>
            {cropNotes.length>0 && (
                <>
                    {cropNotes.map(note => (
                        <>
                          <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                              <Avatar alt="Remy Sharp" src={signincrop} />
                          </ListItemAvatar>
                          <ListItemText
                              primary={
                                <React.Fragment>
                                    <Typography
                                    component="span"
                                    variant="h4"
                                    className={classes.inline}
                                    color="textPrimary"
                                    >
                                    {note.name}
                                  </Typography>
                                </React.Fragment>
                              }
                            secondary={
                                <React.Fragment>
                                <Typography
                                    component="span"
                                    variant="h5"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                   {note.description}
                                </Typography>
                                <Typography
                                    component="span"
                                    variant="h6"
                                    className={classes.floating}
                                    color="textPrimary"
                                >
                                   {moment(note.dateOfNote).format('LL')}
                                </Typography>
                                </React.Fragment>
                            }
                          />
                      </ListItem>
                       <Divider variant="inset" component="li" />
                       </>
                    ))}
                </>
            )}
        </List>
    </>
  );
}
