import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import NetworkForm from './NetworkForm'
import EditNetworkForm from './EditNetworkForm'
import {Card, ListGroup, Button} from 'react-bootstrap'
import {deleteNetwork} from '../services/networkform.service'




const Network = () => {

// Setting state to hold the saved networks
const [networkData, setNetworkData] = useState([])
const [clicked, setClicked] = useState(false)
    
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
    }

const  editNetwork = (network ) => {
     console.log(network);
    return (
     <EditNetworkForm network = {network}/>
     )
 }

 const clickedButton = () => {
    setClicked(true)
 }
  
console.log(networkData)
return (
        <div>
            
            <NetworkForm/>
            <br></br>
            <div className = "saved-contacts">
              <h1 style = {{textAlign: "center"}}>My Contacts</h1>
                <ul> 
                    {networkData.map((network) =>(
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b> Name:</b> {network.name}</ListGroup.Item>
                                <ListGroup.Item><b> Company:</b> {network.company}</ListGroup.Item>
                                <ListGroup.Item>  <b> Phone:</b> {network.phone}<br></br></ListGroup.Item>
                                <ListGroup.Item> <b> Email:</b> {network.email}<br></br></ListGroup.Item>
                                <ListGroup.Item><b> Notes:</b> {network.notes} <br></br></ListGroup.Item>
                            </ListGroup>
                            <br></br>
                            {/* <Button onClick={() => handleEdit(network)}>Edit</Button> */}
                            {clicked === false ? <Button onClick = {()=>clickedButton()}>Edit</Button> : editNetwork(network) }
                            {/* <Button onClick = {()=>clickedButton()}>Edit</Button> */}
                            <br></br>
                            <Button onClick= {() => handleDelete(network)}>Delete</Button>
                        </Card>
                  
                    ))}
                
                </ul>
            </div>
        
        </div>
            
                    

    )
}

export default Network
