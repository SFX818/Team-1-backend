import React,{useState} from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import {editNetwork} from '../services/networkform.service'



const EditNetworkForm = ({network}) => {
 //stores the name
const [newName, setNewName] = useState(network.name);
//stores the company
const [newCompany, setNewCompany] = useState(network.company);
//stores the email
const [newEmail, setNewEmail] = useState(network.email);
//stores the phone number
const [newPhone, setNewPhone] = useState(network.phone);
//stores the notes about the contact
const [newNotes, setNewNote] = useState(network.notes);


// Stores the name in our name state
  const onChangeName = (e) => {
    const newName = e.target.value;
    setNewName(newName);
  };
// Stores the password in our password state
  const onChangeCompany = (e) => {
    const newCompany = e.target.value;
    setNewCompany(newCompany);
  };

// Stores the email in our email state
  const onChangeEmail = (e) => {
      const newEmail = e.target.value
      setNewEmail(newEmail)
 };

// Stores the phone-number in our phone-number
 const onChangePhone = (e) => {
     const newPhone = e.target.value
     setNewPhone(newPhone)
 };

// Stores the notes in our notes array
 const onChangeNote = (e) => {
  const newNotes = e.target.value
  setNewNote(newNotes)
};
// Adds a new network onClick{handleSubmit} with the help of the addNetwork function created in networkform.services.js
 const handleSubmit = (network,e) =>{
     e.preventDefault()
     let id = network._id
     editNetwork(id,newName,newCompany,newEmail,newPhone, newNotes)
 }



return (
  <div>
        <br></br>
        <br></br>
        <h3>Edit an existing contact:</h3>
        <Form>
            <FormGroup text="name">
                <Form.Control
                  type="text"
                  placeholder="name" 
                  name="name"
                  value={newName}
                  onChange={onChangeName}
                />
            </FormGroup>

            <FormGroup text="company">
                <Form.Control
                  type="text"
                  placeholder="company" 
                  name="company"
                  value={network.company}
                  onChange={onChangeCompany}
                />
            </FormGroup>

            <FormGroup text="email">
                <Form.Control
                  type="email"
                  placeholder="email" 
                  name="email"
                  value={network.emaill}
                  onChange={onChangeEmail}
                />
            </FormGroup>

            <FormGroup text="phone">
                <Form.Control
                  type="text"
                  placeholder="phone number" 
                  name="phone"
                  value={network.phone}
                  onChange={onChangePhone}
                />
            </FormGroup>

            <FormGroup text="note">
                <Form.Control
                  type="text"
                  placeholder="note" 
                  name="note"
                  value={network.notes}
                  onChange={onChangeNote}
                />
            </FormGroup>
    
          <Button onClick={(e) =>handleSubmit(network,e)}>Save Changes</Button>
        </Form>
  </div>
          

                        
          
        )
}

export default EditNetworkForm
