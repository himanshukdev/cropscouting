import React,{useState, useEffect} from 'react';
import {useSelector,useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import signincrop from "../../assets/images/signincrop.png";

import {logout} from "../../store/actions/App";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbarroot:{
    backgroundImage:'linear-gradient(45deg, #427510, #f6c329)'
  },
  logoutButton:{
    '&:hover':{
      backgroundColor: '#427510'
    }
  },
  listButton:{
    marginRight:'20px',
    '&:hover':{
      backgroundColor: '#427510'
    }
  }
}));

export default function Header(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const authenticatedUser = useSelector(state=>state.app.authUserEmail);
  const [authUser,setAuthUser] = useState(authenticatedUser);

  useEffect(() => {
    setAuthUser(authenticatedUser);
  }, [authenticatedUser]);

  const handleLogout = () => {
    dispatch(logout());
  }
  const actionButtonHandling = () => {
    switch (props.context) {
      case "Listing":
        props.history.push("/home");  
        break;
      case "Scouting":
        props.history.push("/listing");
        break;
      default:
        break;
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" classes={{root:classes.appbarroot}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
           <Avatar alt="Remy Sharp" src={signincrop} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Crop Scouting
          </Typography>
          <Button classes={{root:classes.listButton}} color="inherit" ><Typography variant="h6" className={classes.title} onClick={actionButtonHandling}>
            {props.context === "Listing"?"Scouting Form":"Scouting List"}
          </Typography></Button>
          <Button classes={{root:classes.logoutButton}} color="inherit" ><Typography variant="h6" className={classes.title} onClick={handleLogout}>
            Log Out {`(${authUser})`}
          </Typography></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
