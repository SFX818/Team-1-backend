import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import NetworkForm from './NetworkForm'
import {Card, ListGroup, Button} from 'react-bootstrap'
import {deleteNetwork,editNetwork} from '../services/networkform.service'
import {getCurrentUser} from '../services/auth.service'




const Network = () => {

// Setting state to hold the saved networks
const [networkData, setNetworkData] = useState([])
    
    useEffect (()=>{
        getNetwork()
    },[])

// Getting the data from our API (database/collection)
    const getNetwork = () =>{
        const network = axios.get("http://localhost:8080/findNetwork", {headers: authHeader()})
        .then(network =>
            setNetworkData(network.data))   
    }

// Grabbing the delete function in networkservices
 const handleDelete = (network) => {
    let id = network._id;
    deleteNetwork(id);
 }
  

    return (

        <div>
               <NetworkForm/>
            <div className = "showsavednetwork">
              <h1 style = {{textAlign: "center"}}>My Contacts</h1>
                <ul> 
                    {networkData.map((network) =>(
                        <Card style={{ width: '18rem' }}>
                            <ListGroup variant="flush">
                                <ListGroup.Item><b> Name:</b> {network.name}</ListGroup.Item>
                                <ListGroup.Item><b> Company:</b>{network.company}</ListGroup.Item>
                                <ListGroup.Item>  <b> Phone:</b> {network.phone}<br></br></ListGroup.Item>
                                <ListGroup.Item> <b> Email:</b> {network.email}<br></br></ListGroup.Item>
                                <ListGroup.Item><b> Notes:</b> {network.notes} <br></br></ListGroup.Item>
                            </ListGroup>
                            <br></br>
                            {/* <Button onClick={handleEdit}>Edit</Button> */}
                            <br></br>
                            {/* <Button onClick={handleDelete}>Delete</Button> */}
                            <Button onClick= {() => handleDelete(network)}>Delete</Button>
                        </Card>
                    ))}
                </ul>
            </div>
        
        </div>
            
                    

    )
}

export default Network
