import logo from './logo.svg';
import './App.css';
import User from './userComponent/UserProfile';
import Login from './loginComponent/Login';

function App() {
  return (
    <div className="App">
      Rack and Strap
      <Login/>
      {/* <User/> */}
    </div>
  );
}

export default App;
