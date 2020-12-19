import {Switch, Route} from 'react-router-dom'

// Components
import Home from "./components/Home"


// CSS imports
import "./css/App.css";

const App = () => {
  return (
    <Switch>
      <Route exact path={["/", "/home"]} component={Home} />
    </Switch>
  );
};

export default App;
