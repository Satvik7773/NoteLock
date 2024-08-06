import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({email: "", password: ""})
  // const [isloged, setisloged] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token', json.jwtToken);
      setCredentials({email:"",password:""});
      props.islogin(true);
      props.showAlert("Logged in Successfully!", "success");
      navigate("/home");
    }
    else{
      props.showAlert(json.error[0].msg, "danger");
      window.scrollTo(0,0);

      if(json.error[0].val === 525){
        setTimeout(()=>{
          navigate("/");
        },800) 
      }
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }

  return (
    <div className='container px-3'>
      <div className="container my-4 mx-auto px-4 py-2" style={{maxWidth:"700px",backgroundColor:"rgba(255,255,255,0.4)",border:"1px solid black", borderRadius:"10px"}}>
        <h2 className='my-3 ' style={{textAlign:"center"}}>Login to continue to NoteLock</h2>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} autoComplete="off" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="my-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div className="container my-3 " style={{textAlign:"center"}}>
            <h6>Don't have an account? <Link style={{display:"inline",color:"blue"}} to="/" className="nav-link nav-link-primary" ><span>Signup </span>
            </Link>here.</h6>
        </div>
      </div>
    </div>
  )
}

export default Login