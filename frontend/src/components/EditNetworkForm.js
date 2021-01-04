import React,{useState} from 'react'
import { Form, FormGroup, Button } from 'react-bootstrap'
import {editNetwork} from '../services/networkform.service'



const EditNetworkForm = ({network, getNetwork, setWhoClicked}) => {
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
 const saveChanges = (network, e) =>{
     e.preventDefault()
     let id = network._id
     editNetwork(id, newName, newCompany, newEmail, newPhone, newNotes)
     //set whoClicked state back to an empty string so the edit form doesnt pass the conditional to display itself anymore
     setWhoClicked('')
     //call getNetwork so the list of contacts will rerender
     getNetwork()
 }



return (
  <div>
        <br></br>
        <br></br>
        <h3>Edit Contact:</h3>
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
                  value={newCompany}
                  onChange={onChangeCompany}
                />
            </FormGroup>

            <FormGroup text="email">
                <Form.Control
                  type="email"
                  placeholder="email" 
                  name="email"
                  value={newEmail}
                  onChange={onChangeEmail}
                />
            </FormGroup>

            <FormGroup text="phone">
                <Form.Control
                  type="text"
                  placeholder="phone number" 
                  name="phone"
                  value={newPhone}
                  onChange={onChangePhone}
                />
            </FormGroup>

            <FormGroup text="note">
                <Form.Control
                  type="text"
                  placeholder="note" 
                  name="note"
                  value={newNotes}
                  onChange={onChangeNote}
                />
            </FormGroup>
    
          <Button onClick={(e) =>saveChanges(network, e)}>Save Changes</Button>
        </Form>
  </div>
  )
}

export default EditNetworkForm
