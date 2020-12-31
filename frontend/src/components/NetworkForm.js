import React,{useState, useEffect} from 'react'
import authHeader from '../utilities/authHeader.utilities'
import { Form, FormGroup, Button } from 'react-bootstrap'
import {addNetwork} from '../services/networkform.service'
import {getCurrentUser} from '../services/auth.service'


const NetworkForm = () => {

//stores the name
const [name, setName] = useState("");
//stores the company
const [company, setCompany] = useState("");
//stores the email
const [email, setEmail] = useState("");
//stores the phone number
const [phone, setPhone] = useState("");
// if any errors, we want to show the error msg
// const [note, setNote] = useState("");

let currentUser = getCurrentUser()
currentUser = currentUser.id



// Stores the name in our name state
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };
// Stores the password in our password state
  const onChangeCompany = (e) => {
    const company = e.target.value;
    setCompany(company);
  };

// Stores the email in our email state
  const onChangeEmail = (e) => {
      const email = e.target.value
      setEmail(email)
 };

// Store the phone-number in our phone-number
 const onChangePhone = (e) => {
     const phone = e.target.value
     setPhone(phone)
 };

 const handleSubmit = (e) =>{
     e.preventDefault()
     addNetwork(currentUser, name,company,email,phone)
 }

return (
 <div>
    <br></br>
    <br></br>
    <h3>Add a new contact:</h3>
    <Form>

        <FormGroup text="name">
            <Form.Control
              type="text"
              name="name"
              value={name}
              onChange={onChangeName}
            />
        </FormGroup>

        <FormGroup text="company">
            <Form.Control
              type="text"
              name="company"
              value={company}
              onChange={onChangeCompany}
            />
        </FormGroup>

        <FormGroup text="email">
            <Form.Control
              type="email"
              name="email"
              value={email}
              onChange={onChangeEmail}
            />
        </FormGroup>

        <FormGroup text="phone">
            <Form.Control
              type="number"
              name="phone"
              value={phone}
              onChange={onChangePhone}
            />
        </FormGroup>

       <Button onClick={handleSubmit}>Submit</Button>
    </Form>
            </div>
      

                    
      
    )
}

export default NetworkForm
