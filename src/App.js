import "./App.css";
import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./contexts/NoteState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null)
  const[islogin,setislogin] = useState(false);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1800);
  }
  const loggedin =()=>{
    setislogin(true);
  }
  const islogout =()=>{
    setislogin(false);
  }
  
  return (
    <div className="App" >
      <NoteState>
        <Router>
          <Navbar islogin={islogin} islogout={islogout} showAlert = {showAlert}/>
          <Alert alert={alert} />
          <main role="main" className="flex-shrink-0">
            <Routes>
              <Route exact path="/" element={<Signup showAlert={showAlert} islogin={loggedin}/>} />
              <Route exact path="/login" element={<Login showAlert={showAlert} islogin={loggedin}/>}/>
              <Route exact path="/home" element={<Home showAlert={showAlert}/>}/>
              <Route exact path="/about" element={<About/>}/>
            </Routes>
          </main>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
