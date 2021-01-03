import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";


const Home = () => {

  const currentUser = getCurrentUser();

  const [quotes, setQuotes] = useState([]);


  useEffect(() => {
    quoteGrabber();
  }, []);

  const quoteGrabber = () => {
    const quoteData = axios
      .get("https://type.fit/api/quotes", { headers: authHeader() })
      .then((quoteData) => setQuotes([quoteData.data[getRandomInt()]]));
    // .catch(err => console.log(err.message))
  } 
  



//GENERATE A NEW QUOTE 
  function getRandomInt(min, max) {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  const newQuote = () =>{
    if (quotes.length > 0 ) {
      return <p> "{quotes[0].text}" 
      <br></br>  
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; by <b> {quotes[0].author} </b></p>
    }
  }


  // create num generator that and put that inside the data array



  
  console.log("THIS IS ALL QUOTES ", quotes[0]);





  return <div id="homeBigDiv">
    
    <div id="home"> 
    <h3 id="userHome">
      <strong> Welcome {currentUser.username} </strong>
    </h3>
    <br></br>
    <br></br>
  
   <h5> {newQuote()}</h5>
   </div>
  </div>;
};

export default Home;
