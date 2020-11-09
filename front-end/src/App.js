import './App.css';
import { Route, Switch, Redirect } from "react-router-dom"
import Navbar from "./containers/Navbar"
import Homepage from "./pages/Homepage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"
import Profile from "./pages/Profile"
import Recipe from "./pages/Recipe"
import { useState } from "react"
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
        {loggedIn ?
          <>
            <Route exact path="/users/:userId"><Profile loggedIn={loggedIn} /></Route>
            <Route exact path="/recipes/:recipeId"><Recipe loggedIn={loggedIn} /></Route>
          </>
          : null
        }
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
