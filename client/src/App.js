import logo from './logo.svg';
import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Navigate from './pages/Nav/index.js';

function App() {
  return (
    <div className="App">
      Rack and Strap
      <Navigate/>
      <LandingPage />
      <Login/>
      {/* <User/> */}
    </div>
  );
}

export default App;
