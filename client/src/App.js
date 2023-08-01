import logo from './logo.svg';
import './App.css';

import NavigateBar from './pages/Nav/index.js';
import Footer from './pages/Footer/index.js';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/index.js'
import Login from './componets/Login/Login.js'
import User from './userComponent/UserProfile.js'
import LandingPage from './pages/LandingPage/LandingPage.js';
import CreateJob from './componets/CreateJob/index.js';
import MyJobs from './pages/MyJobs';

function App() {
  return (
    <div className="App">
      
      <NavigateBar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/userprofile' element={<User/>}/>
        <Route path='/createpost' element={<CreateJob/>}/>
        <Route path='/myjobs' element={<MyJobs/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<LandingPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
