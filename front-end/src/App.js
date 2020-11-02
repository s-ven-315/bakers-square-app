import './App.css';
import { Route, Switch } from "react-router-dom"
import Navbar from "./containers/Navbar"
import Homepage from "./pages/Homepage"
import SignUp from "./pages/SignUp"
import Login from "./pages/Login"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default App;
