import './App.css';
import { Route, Switch, Redirect } from "react-router-dom"
import Navbar from "./containers/Navbar"
import Homepage from "./pages/Homepage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Recipe from "./pages/Recipe"
import Session from "./pages/Session"
import React from 'react'
import DataProvider from "./contexts/Context";

function App() {
  return (
      <DataProvider>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path="/"><Homepage/></Route>
            <Route exact path="/signup"><SignUp/></Route>
            <Route exact path="/login"><Login/></Route>
            <Route exact path="/users/:userId"><Profile/></Route>
            <Route exact path="/recipes/:recipeId"><Recipe/></Route>
            <Route exact path="/recipes/:recipeId/sessions"><Session/></Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </DataProvider>
  );
}

export default App;
