import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Leather from './component/leather';
import Region from './component/Region';
import Animals from './component/Animals';
import Location from './component/Location';
import Error from './component/Error';
import Header from './component/Header';

export default class App extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <Header />
        <Switch>
            <Route exact path="/" component={Animals}/>
            <Route path="/Leather" component={Leather}/>
            <Route path="/Region" component={Region}/>
            <Route path="/Location" component={Location}/>
            <Route component={Error} />
        </Switch>
      </BrowserRouter>
    )
  }
}

