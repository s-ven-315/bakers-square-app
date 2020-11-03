import './App.css';
import { Route, Switch } from "react-router-dom"
import Navbar from "./containers/Navbar"
import Homepage from "./pages/Homepage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Login"
import { Profiler, useState } from "react"
import React from 'react'

function App() {
  const userJsonString = localStorage.getItem('user')
  const initialLoggedIn = (userJsonString) ? JSON.parse(userJsonString) : null
  const [loggedIn, setLogged] = useState(initialLoggedIn)

  return (
    <div className="App">

      <Navbar loggedIn={loggedIn} setLogged={setLogged} />
      <Switch>
        <Route exact path="/"><Homepage /></Route>
        <Route exact path="/signup"><SignUp loggedIn={loggedIn} setLogged={setLogged} /></Route>
        <Route exact path="/login"><Login loggedIn={loggedIn} setLogged={setLogged} /></Route>
        <Route exact path="/profile"><Profile /></Route>
      </Switch>
    </div>
  );
}

export default App;
