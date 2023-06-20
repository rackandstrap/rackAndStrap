import logo from './logo.svg';
import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';
import LandingPage from './pages/LandingPage/LandingPage.js';
import Chat from './componets/Chat';
function App() {
  return (
    <div className="App">
      Rack and Strap
      <LandingPage />
      <Login/>
      {/* <User/> */}
      <Chat />
    </div>
  );
}

export default App;
