import React,{useState, useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'
import { Form, Button } from 'react-bootstrap'

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
              <h1 style = {{textAlign: "center"}}>Network Roledex</h1>
                <ul> 
                    {networkData.map((network, index) =>(
                        <li 
                            key={index}> 
                            <b> Name:</b> {network.name} <br></br>
                            <b> Company:</b>{network.company}<br></br>
                            <b> Phone:</b> {network.phone}<br></br>
                            <b> Email:</b> {network.email}<br></br>
                            <b> Notes:</b> {network.notes} <br></br>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
            <br></br>
            <br></br>
                <h3>Add a new contact:</h3>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="name" placeholder="Name" />
                        <Form.Text className="text-muted">
                            
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicCompany">
                        <Form.Label>Company</Form.Label>
                        <Form.Control type="company" placeholder="company" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="phone" placeholder="phone number" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="email" />
                    </Form.Group>
                       
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                </Form>
            </div>
        </div>

                    

    )
}

export default Network
