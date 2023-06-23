import logo from './logo.svg';
import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';
import LandingPage from './pages/LandingPage/LandingPage.js';
import NavigateBar from './pages/Nav/index.js';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      Rack and Strap
      <NavigateBar/>
      {/* <LandingPage />
      <Login/> */}
      {/* <User/> */}
    </div>
  );
}

export default App;
