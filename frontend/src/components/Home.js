import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/auth.service";
import axios from "axios";
import authHeader from "../utilities/authHeader.utilities";
import { Card, CardDeck, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const Home = () => {


  const currentUser = getCurrentUser();


  const [quotes, setQuotes] = useState([]);
  const [news, setNews] = useState([])


  useEffect(() => {
    quoteGrabber();
    newsGrabber()
  }, []);


  const quoteGrabber = () => {
    const quoteData = axios
      .get("https://type.fit/api/quotes", { headers: authHeader() })
      .then((quoteData) => setQuotes([quoteData.data[getRandomInt()]]));
    // .catch(err => console.log(err.message))
  } 
  
  const newsGrabber = () => {
    axios.get('https://newsapi.org/v2/top-headlines?q=technology&apiKey=1d9ca5b13652436b801f9572b8878b27')
    .then (response =>{
      setNews(response.data.articles)
      console.log("this is the data we get back from the api", response.data)

    })
  }



//GENERATE A NEW QUOTE 
  function getRandomInt(min, max) {
    min = Math.ceil(1);
    max = Math.floor(1000);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }


  const newQuote = () =>{
    if (quotes.length > 0 ) {
      return (
      <div> 
        <p> "{quotes[0].text}" </p> 
      <p id="author"> by {quotes[0].author} </p> 
      </div>
      )}
  }

  // create num generator that and put that inside the data array
  

  return <div id="bigboy">
    
    <div id="home"> 
    <h3 id="userHome">
      <strong> Welcome {currentUser.username} </strong>
    </h3>
  <br></br>
   <h5> {newQuote()}</h5>
   </div>
   <br></br>
   <br></br>
   <h1>Take a look at the latest in Tech News:</h1>
   <br></br>
  <CardDeck>
  {news.map((article) =>(
  
    <Card style={{ width: '100rem', height:'25rem'}}> 
    <Card.Img variant="top" src={article.urlToImage} />
      <Card.Body>
        <Card.Title>{article.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{article.author}</Card.Subtitle>
          <a href={article.url}>
          <Button variant="info">See Article</Button>
          </a>
      </Card.Body>
    </Card>
    
  ))}
  </CardDeck>
  <br></br>
  </div>;
};

export default Home;







