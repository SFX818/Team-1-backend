import {Switch, Route} from 'react-router-dom'

// Components
import Home from "./components/Home"
// HOC which wraps around other components
import Layout from './components/common/Layout'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Landing from './components/Landing'
import SavedJobs from './components/SavedJobs'
import Network from './components/Network'
import AddJob from './components/AddJob'

// CSS imports
import "./css/App.css";

const App = () => {
  return (
    <Layout>
      <Switch>
       <Route exact path={["/", "/home"]} component={Home} />
       <Route exact path="/login" component={Login}/>
       <Route exact path="/register" component={Signup}/>
       <Route exact path="/profile" component={Profile}/>
       <Route exact path="/jobsearch" component={Landing}/>
       <Route exact path="/profile/savedjobs" component={SavedJobs}/>
       <Route exact path="/profile/network" component={Network}/>
       <Route exact path="/addjob" component={AddJob}/>
     </Switch>
    </Layout>
  );
};

export default App;
