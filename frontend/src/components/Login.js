import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
//helper
import {login} from '../services/auth.service'
import {resMessage} from '../utilities/functions.utilities'
//components 
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'
// import {Spinner} from 'react-spinkit'
// Function given to react-validator
const required = (value) => {          
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const Login = (props) => {
  const Spinner = require('react-spinkit')
  const form = useRef();
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  // Stores the username in our username state
  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  // Stores the password in our password state
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
      e.preventDefault()
      //prevent message clear them out 
      setMessage('')
      setLoading(true)
      //valides all the filed s 
      form.current.validateAll()

      if(checkBtn.current.context._errors.length === 0){

      login(username, password).then(
        () =>{
          props.history.push('/landing')
          window.location.reload()
        },
        (error) => {
          //checking all the data recieved from our backend 
              //setting loading to false and return the error 
              setLoading(false)
              setMessage(resMessage(error))
        }
      )
      }else{
        setLoading(false)
      }
  };
  

  return (
    <div id="bigOne"> 
    <p id="glow">Everything you need to land your first software engineering job.</p>
{/* <div className="one">
  <h1 id="h11"> Everything you need to land your first software engineering job.</h1>
</div> */}

    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="https://i.postimg.cc/zXPSbRGC/correct.jpg"
          alt="profile-img"
          className="profile-img-card"
        />
        <Form onSubmit={handleLogin} ref={form}>
          <FormGroup text="Username">
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
         </FormGroup>

          <FormGroup text="Password">
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </FormGroup>

        <ButtonSpinner text="Login" loading={loading} />
        {/* <Spinner name="three-bounce" color="teal" loading={loading} /> */}


          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    </div>
  );
};
export default Login;