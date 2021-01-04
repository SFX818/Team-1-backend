import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import NetworkForm from './NetworkForm'
import EditNetworkForm from './EditNetworkForm'
import {Card, ListGroup, Button, CardDeck} from 'react-bootstrap'
import {deleteNetwork} from '../services/networkform.service'

//css import 
import "../css/network.css";



const Network = () => {

// Setting state to hold the saved networks
const [networkData, setNetworkData] = useState([])
const [submit, setSubmit] = useState(false)
//this state is used to keep track of which contact was intended to be edited 
const [whoClicked, setWhoClicked] = useState('')

// Using the getNetwork function that access our API(backend)
useEffect (()=>{
    getNetwork()
},[])

// Getting the data from our API (database/collection)
const getNetwork = () =>{
        const network = axios.get("http://localhost:8080/findNetwork", {headers: authHeader()})
        .then(network =>
            setNetworkData(network.data))   
    }

// Grabbing the network and deleting by the id with the help of the delete function created in networkform.services.js
const handleDelete = (network) => {
        let id = network._id;
        deleteNetwork(id);
        getNetwork();
    }

//this function is attacked to the edit button and the specific network id is passed in. By setting whoClicked to be equal to the network id, we can then compare it in the conditional to determine which contact will display the edit form in place of the contact info (before the edit button would open for every contact)
 const clickedButton = (id) => {
    setWhoClicked(id)
 }
  

return (
        <div> 
        <NetworkForm getNetwork={getNetwork}/>
        <br></br>
        <div className = "saved-contacts">
          <h1 style = {{textAlign: "center"}}>My Contacts</h1>
            {/* <CardDeck> */}
            <div className='contact-container'>
                {networkData.map((network) =>(
                    <div className='network-card'>
                        {/* the below condition will determine which contact will open the edit form */}
                        {whoClicked === network._id ?
                        <EditNetworkForm network={network} getNetwork={getNetwork} setWhoClicked={setWhoClicked}/>
                        : 
                        <div>
                        <ListGroup variant="flush">
                        <ListGroup.Item><b> Name:</b> {network.name}</ListGroup.Item>
                        <ListGroup.Item><b> Company:</b> {network.company}</ListGroup.Item>
                        <ListGroup.Item><b> Phone:</b> {network.phone}<br></br></ListGroup.Item>
                        <ListGroup.Item><b> Email:</b> {network.email}<br></br></ListGroup.Item>
                        <ListGroup.Item><b> Notes:</b> {network.notes} <br></br></ListGroup.Item>
                        <ListGroup.Item className= 'contact-btn'>
                            <Button onClick={() => clickedButton(network._id)}>Edit</Button>
                            <Button onClick= {() => handleDelete(network)}>Delete</Button>
                        </ListGroup.Item>
                        </ListGroup>
                        {/* <br></br>
                        <Button onClick={() => clickedButton(network._id)}>Edit</Button>
                        <br></br>
                        <Button onClick= {() => handleDelete(network)}>Delete</Button> */}
                        </div>
                        }
                    </div>
                ))}
            {/* </CardDeck> */}
            </div>
        </div>
    </div>
    )
}

export default Network
