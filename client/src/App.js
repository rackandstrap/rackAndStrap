import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';
import LandingPage from './pages/LandingPage/LandingPage.js';
import JobListing from './componets/JobListing';

function App() {



  return (
    <div className="App">
      Rack and Strap
      <LandingPage />
      <Login/>
      <JobListing />
      {/* <User/> */}
    </div>
  );
}

export default App;
