import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Reset from './components/Reset/Reset';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login}/>
          <Route exact path='/register' Component={Register}/>
          <Route exact path='/reset' Component={Reset}/>
          <Route exact path='/dashboard' Component={Dashboard}/>
        </Routes>
      </Router>
    </div>
  );
}
export default App;