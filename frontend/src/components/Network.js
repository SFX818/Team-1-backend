import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import NetworkForm from './NetworkForm'
import {Card, ListGroup} from 'react-bootstrap'

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

    

    return (




        <div>
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
                            </ListGroup></Card>
                    ))}
                </ul>
            </div>
            <NetworkForm/>
        </div>
            
                    

    )
}

export default Network
