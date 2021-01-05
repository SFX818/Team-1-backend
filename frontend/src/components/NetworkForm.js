import React,{useState} from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import {addNetwork} from '../services/networkform.service'
import {getCurrentUser} from '../services/auth.service'



const NetworkForm = ({getNetwork, setUpdate}) => {

//stores the name
const [name, setName] = useState("");
//stores the company
const [company, setCompany] = useState("");
//stores the email
const [email, setEmail] = useState("");
//stores the phone number
const [phone, setPhone] = useState("");
//stores the notes about the contact
const [notes, setNote] = useState("");


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

// Stores the phone-number in our phone-number
 const onChangePhone = (e) => {
     const phone = e.target.value
     setPhone(phone)
 };

// Stores the notes in our notes array
 const onChangeNote = (e) => {
  const notes = e.target.value
  setNote(notes)
  //NOTE: messing arround with notes as an array
  // const note = e.target.value
  // const notes = [];
  // console.log('note', note.split(''));
  // let noteArr = note.split('');
  // noteArr.map((letter, i, arr) => {
  //   if(letter === '$'){
  //     notes.push((arr.splice(0,i)).join(''))
  //   }
  //   console.log('notes', notes);
  // })
  // setNote(note)
};

// Adds a new network onClick{handleSubmit} with the help of the addNetwork function created in networkform.services.js
 const handleSubmit = (e) =>{
     e.preventDefault()
     addNetwork(currentUser, name, company, email, phone, notes)
     //setting update to make the networks rerender after an add
     setUpdate(prevUpdate => !prevUpdate)
     //setting states to empty strings will allow the contact form to revert back to the placeholders
     setName('')
     setCompany('')
     setEmail('')
     setPhone('')
     setNote('')
 }



return (
  <div id='form-div'>
        <br></br>
        <br></br>
        <h2>Add a New Contact:</h2>
        <Form className = "form">
            <FormGroup text="name">
                <Form.Control
                  size ="sm"
                  type="text"
                  placeholder="Name" 
                  name="name"
                  value={name}
                  onChange={onChangeName}
                />
            </FormGroup>

            <FormGroup text="company">
                <Form.Control
                  size ="sm"
                  type="text"
                  placeholder="Company" 
                  name="company"
                  value={company}
                  onChange={onChangeCompany}
                />
            </FormGroup>

            <FormGroup text="email">
                <Form.Control
                  size="sm"
                  type="email"
                  placeholder="Email" 
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                />
            </FormGroup>

            <FormGroup text="phone">
                <Form.Control
                  size ="sm"
                  type="text"
                  placeholder="Phone Number" 
                  name="phone"
                  value={phone}
                  onChange={onChangePhone}
                />
            </FormGroup>

            <FormGroup text="note">
                <Form.Control
                  size= "sm"
                  type="text"
                  placeholder="Note" 
                  name="note"
                  value={notes}
                  onChange={onChangeNote}
                />
            </FormGroup>
    
          <Button variant="flat" size="xl" onClick={handleSubmit} id='add-net-btn'>Submit</Button>
        </Form>
  </div>
          

                        
          
        )
}

export default NetworkForm
