import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Navigate from './pages/Nav/index.js';
import JobListing from './componets/JobListing';

function App() {



  return (
    <div className="App">
      <Navigate/>
      Rack and Strap
      <LandingPage />
      <Login/>
      <JobListing />
    </div>
  );
}

export default App;
