  //* *********************************************/
  //       Fullfilling Component Requirements.
  //* ********************************************/

// Library Imports
import React from "react";
import { Route, Switch,Redirect } from "react-router";

//Internal Imports
import ScoutListing from "../Crop/scoutingList";
import HomeMain from "./HomeMain";

  //* *********************************************/
  //       Component definition
  //* ********************************************/
export default function AuthMain(props){

    return (
        <div>
            <Switch>
                <Redirect exact path="/" to="/home" />
                <Route path="/home" component={HomeMain} />
                <Route path="/listing" component={ScoutListing} />
            </Switch>
        </div>
    );

}