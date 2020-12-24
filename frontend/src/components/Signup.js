import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import FormGroup from './common/FormGroup'
import { isEmail } from "validator"

import { register } from '../services/auth.service'
import ButtonSpinner from "./common/ButtonSpinner";
import {resMessage} from '../utilities/functions.utilities'

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


//makes the password restrictions
const vusername = (value) =>{
  if(value.length < 5 || value.length >= 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 5-20 characters.
      </div>
    )
  }
}



//verifying email
const validEmail = (value) =>{
  if(!isEmail(value)){
    return (
      <div className="alert alert-danger" role='alert'>
         Invalid email, try again.
      </div>
    )
  }
}

const vpassword = (value) =>{
  if(value.length < 6 || value.length >= 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6-20 characters.
      </div>
    )
  }
}




const Signup = (props) => {
  const form = useRef();
  const checkBtn = useRef();


  //create 4 states

  //stores the username
  const [username, setUsername] = useState("");
  //stores the password
  const [password, setPassword] = useState("");
  //stores the email
  const [email, setEmail] = useState('');
  //if any data loading we want to show the loader image
  const [successful, setSuccessful] = useState(false);
  // if any errors, we want to show the error msg
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

//stores the email in our email state
  const onChangeEmail = (e) => {
      const email = e.target.value
      setEmail(email)
  }

  const handleSignup = (e) => {
    e.preventDefault();
    //Prevent message clear them out
    setMessage("")
    setSuccessful(true)

    // Validates all the fields
    form.current.validateAll();

    // Validator stores errors and we can check if error exist
    if(checkBtn.current.context._errors.length === 0){
        register(username,email, password).then(
          (response) =>{
            setMessage(response.data.message)
            setSuccessful(true)
          },
            (error) =>{
              setMessage(resMessage(error))
              setSuccessful(false)
            }
        );
    }
  }
  







  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleSignup} ref={form}>
          <FormGroup text="username">
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required, vusername]}
            />
          </FormGroup>

          <FormGroup text="email">
            <Input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required, validEmail]}
            />
          </FormGroup>

          <FormGroup text="password">
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required, vpassword]}
            />
            </FormGroup>

          <ButtonSpinner text="Sign Up"/> 

          {message && (
            <div className="form-group">
              <div className={successful ? "alert alert-success" : "alert alertdanger"} role="alert">
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Signup;
