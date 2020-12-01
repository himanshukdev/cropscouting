import React from "react";
import { useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Route, Switch,Redirect } from "react-router";
import { makeStyles  } from '@material-ui/core/styles';
import SignIn from "../Auth/SignIn";
import AuthMain from "./AuthMain";
import ErrorNotFound from "../Home/ErrorNotFound";
import crop from "../../assets/images/crop.jpg";
import error from "../../assets/images/error.jpg"
const useStyles = makeStyles((theme) => ({
    background1: {
      backgroundImage:"url(" + crop + ")",
        height: '100vh',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    },
    background2: {
      backgroundImage:'linear-gradient(45deg, #427510, #f6c329)'
    },
    background3: {
      backgroundImage:"url(" + error + ")",
        height: '100vh',
        backgroundPosition:'center',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
    },
    circularColor:{
      color:'#e4bb27'
    },
    circularRoot1:{
      position:'fixed',
      left:'14px',
      top:'3px'
    },
    circularRoot2:{
      position:'relative',
      left:'723px',
      top:'477px',
      zIndex:'999',


    }
}));

const RestrictedRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
export default function Main(props){
    const classes = useStyles()
    const access_token = localStorage.getItem("access_token");
    const isLoading = useSelector(state=>state.app.isFetchingData);

    if (props.location.pathname === "/") {
        if (!access_token) {
          return (
            <Redirect
              to={`/signin`}
            />
          );
        }
        if (props.history.location.pathname !== "/") {
          return <Redirect to={props.history.location.pathname} />;
        }
      }

      const determineBackground = () => {
        let classnameKey="";
        switch (props.history.location.pathname) {
          case "/listing":
            classnameKey=classes.background2;
            break;
          case "/home":
          case "/signin":
            classnameKey=classes.background1;
            break;
          default:
            classnameKey=classes.background3
            break;
        }
        return classnameKey
      }
    return (
        <>
          <div className={determineBackground()}>
          {isLoading && (
            <div>
              <CircularProgress size={60}  classes={{root:props.history.location.pathname === "/signin"?classes.circularRoot2:classes.circularRoot1,colorPrimary:classes.circularColor}}/>
            </div>
          )}
            <Switch>
                <Route path="/signin" component={SignIn} />
                <RestrictedRoute
                  path="/"
                  token={access_token}
                  component={AuthMain}
                />
                <Route path="*" component={ErrorNotFound} />
              </Switch>
          </div>
        </>
    );
}