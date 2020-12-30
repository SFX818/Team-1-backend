import React,{useState,useEffect} from 'react'
import axios from 'axios'
import authHeader from '../utilities/authHeader.utilities'

const Network = () => {
    
    // Setting state to hold the saved networks
    const [networkData, setNetworkData] = useState([])

    useEffect (()=>{
        getNetwork()
    },[])

    const getNetwork = () =>{
        const network = axios.get("http://localhost:8080/findNetwork", {headers: authHeader()})
        .then(network =>
            setNetworkData(network.data))
         
    }
  console.log(networkData)

    return (
       
         <div>
                    <h2>Name:{networkData[0].name}</h2>
                    
            
        </div>
    )
}

export default Network
