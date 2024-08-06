import React,{useState} from "react";
import {useNavigate} from 'react-router-dom';
import { Link } from "react-router-dom";

const Signup = (props) => {
  const[credentials,setCredentials] = useState({name: "",email:"",password:"",cpassword:""})
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password,cpassword } = credentials;
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, cpassword })
    });
    const json = await response.json()
    
    if (json.success) {
      localStorage.setItem('token', json.jwtToken);
      setCredentials({name: "",email:"",password:"",cpassword:""});
      props.islogin(true);
      props.showAlert("Accont Created Successfully!", "success")
      navigate("/home");
      
    }
    else {
      props.showAlert(json.error[0].msg, "danger");
      window.scrollTo(0,0);
      if(json.error[0].val === 525){
        setTimeout(()=>{
          navigate("/login");
        },800) 
      }
    }
    
    
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container px-3">
      <div className="container my-3 mx-auto px-4 py-2 " style={{ maxWidth:"700px",backgroundColor:"rgba(255,255,255,0.4)",border:"1px solid black", borderRadius:"10px"}}>
        <h2 className="my-3" style={{ textAlign: "center" }}>
          Create an account to Lock your Notes!
        </h2>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" autoComplete="off" onChange={onChange} minLength={3} value ={credentials.name} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" autoComplete="off" aria-describedby="emailHelp" onChange={onChange} value ={credentials.email} required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={6} value ={credentials.password} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} minLength={6} value ={credentials.cpassword} required />
          </div>
          <button  type="submit" className="btn btn-success">Signup</button>
        </form>
        <div className="container my-3 " style={{textAlign:"center"}}>
            <h6>Already have an account? <Link style={{display:"inline",color:"blue"}} to="/login" className="signinlink nav-link nav-link-primary" ><span>Signin</span>
            </Link></h6>
          </div>
      </div>
    </div>
  );
};

export default Signup;
