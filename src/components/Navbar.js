import React, { useState } from 'react';
import { NavLink,useNavigate } from 'react-router-dom';

  
const Navbar = (props) => {
  const [show, setshow] = useState("");
  

  const navigate = useNavigate();

  const click= ()=>{
    setshow("");
    if(props.islogin){localStorage.removeItem("token");}
    props.islogout();
  }
  const clicka= ()=>{
    setshow("");
    // if(props.islogin){localStorage.removeItem('token');}
  }
  const clickb = ()=>{
    setshow("show");
  } 

  const logout = ()=>{
    setshow("");
    props.islogout();
    props.showAlert("You have been loged out!", "success");
    localStorage.removeItem('token');
    navigate("/login");
  }
  
  return (
    <div>
      
      <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor : "#217b7e"}} >
        <div className="container-fluid">
          < NavLink to ="/" className="navbar-brand" onClick={click}>
            <img src="favicon.ico" alt="_"/>NoteLock
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={clickb}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show}`} id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{"fontWeight":"500"}}>
              <li className="nav-item">
                < NavLink to="/home" className="nav-link" onClick={clicka}
                  activeclassname="active" >
                  Home
                </NavLink>
                 
              </li>
              <li className="nav-item">
                < NavLink to="/about" className="nav-link" onClick={clicka}
                  activeclassname="active">
                  About
                </NavLink>
                 
              </li>
            </ul>
            <div>
              {props.islogin?
              (<div className="btn btn-primary" onClick={logout}>Logout</div>)
              :(<div><NavLink to="/login" className="btn btn-primary mx-1 my-1" type="submit" onClick={click}>
                Login
              </NavLink>
              <NavLink to="/" className="btn btn-success mx-1 my-1" type="submit" onClick={click}>
                Signup
              </NavLink></div>)
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar;
