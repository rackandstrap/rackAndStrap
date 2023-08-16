import logo from './logo.svg';
import './App.css';

import NavigateBar from './pages/Nav/index.js';
import Footer from './pages/Footer/index.js';
import { Link, Navigate, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/index.js';
import Login from './componets/Login/Login.js';
import User from './userComponent/UserProfile.js';
import LandingPage from './pages/LandingPage/LandingPage.js';
import CreateJob from './componets/CreateJob/index.js';
import MyJobs from './pages/MyJobs';
import About from './pages/About/index.js';
import FAQ from './pages/FAQ/index.js';
import Terms from './pages/Terms/index.js';
import Contact from './pages/Contact/index.js';
import Team from './pages/Team/index.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  return (
    <div className="App">
      <NavigateBar/>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/landingpage' element={<LandingPage/>}/>
        <Route path='/login' element={<SignIn/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/userprofile' element={<User/>}/>
        <Route path='/createpost' element={<CreateJob/>}/>
        <Route path='/myjobs' element={<MyJobs/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/FAQ' element={<FAQ/>}/>
        <Route path='/terms' element={<Terms/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/team' element={<Team/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/*' element={<LandingPage/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
