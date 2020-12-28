const express = require('express') 
const bodyParser = require('body-parser') 
const dbConfig = require('./config/db.config')
const mongoose = require("mongoose");
//to prevent unanthorixed endpoints in the browser
const cors = require("cors"); /*  Require here   */


const app = express()  

app.use(cors()); /*  Use here   */

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse request of content type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// SETUP MONGOOSE
const db = require('./models/')
const Role = db.role
const Network = db.network

//access the models
const SavedJob = db.savedJob;

// connect to mongo database
db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });


// simple route, do I work?
app.get('/', (req,res) => {
    res.json({message: "Welcome to the home page"})
})

// import the routes we wrote
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/savedJob.routes')(app)
require('./routes/network.routes')(app)

// set the port, listen for request
const PORT = process.env.PORT || 8080
app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }



  // THIS IS TESTING THE SAVED JOB ROUTE.   ... POST?
  // const savedJob1 = new SavedJob({
  //   language: "english",
  //   company: "google",
  //   jobTitle: "junior software developer",
  //   heardBack: {
  //     status: "true",
  //     scheduledInterview: "1-20-2021",
  //     closed: "false",
  // },
  //   appliedTo: {
  //     appStatus: "true",
  //     date: "12-21-2020",
  //     notes: ["this is a test"],
  //   }
  // })

  // savedJob1.save()
  // console.log("THIS IS THE SAVED JOB", savedJob1)


  // const savedJob2 = new SavedJob({
  //   language: "javaScript",
  //   company: "Amazon",
  //   jobTitle: "Sr. software developer",
  //   heardBack: {
  //     status: "false",
  //     scheduledInterview: "",
  //     closed: "false",
  // },
  //   appliedTo: {
  //     appStatus: "true",
  //     date: "12-26-2020",
  //     notes: ["this is second test"],
  //   }
  // })

  // savedJob2.save()
  // console.log("THIS IS THE SAVED JOB", savedJob2)





  // const savedJob3 = new SavedJob({
  //   language: "java",
  //   company: "Youtube",
  //   jobTitle: "Software developer",
  //   heardBack: {
  //     status: "true",
  //     scheduledInterview: "4/20/21",
  //     closed: "false",
  // },
  //   appliedTo: {
  //     appStatus: "true",
  //     date: "12-31-2020",
  //     notes: ["this is the third test"],
  //   }
  // })

  // savedJob3.save()
  // console.log("THIS IS THE SAVED JOB", savedJob3)



  // const savedJob4 = new SavedJob({
  //   location: "boston",
  //   language: "CSS",
  //   company: "google",
  //   jobTitle: "junior software developer",
  //   heardBack: {
  //     status: "true",
  //     scheduledInterview: "1-20-2021",
  //     closed: "true",
  // },
  //   appliedTo: {
  //     appStatus: "true",
  //     date: "12-21-2020",
  //     notes: ["this is terminal test"],
  //   }
  // })

  //   savedJob4.save()
  // console.log("THIS IS THE SAVED JOB", savedJob4)



