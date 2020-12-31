const { savedJob } = require('../models/index');
const db = require('../models/index');
const { populate } = require('../models/user.model');
const SavedJob = db.savedJob
const User = db.user



//POST route thats connected to /newsavedjob: will create and save a new job and add it to the current user
//(THIS IS WORKING, LEAVE IT ALONE)
exports.saveAJob = (req, res) => {
  console.log('hit saveajob route')
  console.log('req ', req.body)
  const savedJob = new SavedJob(req.body);
  savedJob.save();
  User.findById({_id: req.userId})
  .then(foundUser => {
      foundUser.savedJobs.push(savedJob);
      foundUser.save();
      res.send(foundUser);
  })
  .catch(err => {
      res.send({message: err})
  })   
}


// GET all jobs (working), attached to GET route in user.routes
exports.findAllJobs = (req, res) =>{
  User.findOne({
    _id:req.userId
  })
  .populate('savedJobs').
  exec(function(err, user){
    if (err) return handleError(err);
    //res.send(user.savedJobs)

    //object that will store all jobs and also separate them out 
    const usersJobs = {
      allJobs: [],
      appliedToJobs: [],
      heardBackJobs: [],
      deniedFromJobs: [],
      needActionJobs: []
    }

    user.savedJobs.map(job => {
      //push all jobs so we have access to all saved jobs to display
      usersJobs.allJobs.push(job);

      //separating jobs user has applied to: if yes, check if they have heard back or if they were denied, else put them in the need action array
      if(job.appliedTo.appStatus === true){
        usersJobs.appliedToJobs.push(job);

        //if user has applied, check if they have heard back
        if(job.heardBack.status === true) {
          usersJobs.heardBackJobs.push(job)
        }

        // If user has applied, check if they have been denied
        // NOTE: IF YOU GOT DENIED IT MEANS YOU HEARD BACK. MIGHT PUT
        // THIS IF INSIDE OF THE
        // ABOVE HEARD.BACK.STATUS IF STATEMENT 
        // BUT IT ALSO MIGHT BE TOO MUCH TO ASK OF THE USER 
        if(job.heardBack.closed === true){
          usersJobs.deniedFromJobs.push(job)
        }

      } else {
        usersJobs.needActionJobs.push(job);
      }
    })
    res.send(usersJobs);
    // console.log("usersJobs.allJobs.length", usersJobs.allJobs.length);
    // console.log("usersJobs.appliedToJobs.length", usersJobs.appliedToJobs.length);
    // console.log("usersJobs.heardBackJobs.length", usersJobs.heardBackJobs.length);
    // console.log("usersJobs.deniedFromJobs.length", usersJobs.deniedFromJobs.length);
    // console.log("usersJobs.needActionJobs.length", usersJobs.needActionJobs.length);
  })
}

//DELETE based on :id   (working)
//(THIS IS WORKING, LEAVE IT ALONE)
exports.delete = (req, res) =>{
  const id = req.params.id
  SavedJob.remove(
      {_id: id},
  ).then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete id=${id}. fix the delete controller!`
        });
      } else res.send({ message: "saved job was deleted successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Tutorial with id=" + id
      });
    });
};

// GET route to see all the jobs user has heard back from
// created an empty array and pushed only the jobs that status was true 
// exports.findAllHeardBack = (req, res) => {
//   User.findOne({
//     _id: req.userId
//   })
//   .populate('savedJobs').
//   exec(function(err, user) {
//     if (err) return handleError(err);
    
//     const heardBackJobs = [];
//     user.savedJobs.map(job => {
//       if(job.heardBack.status === true) {
//         heardBackJobs.push(job)
//       }
//     })
//     res.send(heardBackJobs)
//   })
// }


//         //GET  applied: true  (working)
// exports.findAllAppliedTo = (req, res)=>{
//     SavedJob.find({"appliedTo.appStatus": true} )
//     .then(data => {
//         if (!data) {
//           res.status(404).send({
//             message: "Cannot find all heard back jobs!"
//           });
//         } else res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error finding jobs by status heard back true" 
//         });
//     });
// }



// // GET closed: true (working)
// exports.findAllRejected = (req, res)=>{
//   SavedJob.find({"heardBack.closed": true} )
//   .then(data => {
//       if (!data) {
//         res.status(404).send({
//           message: "Cannot find all rejected jobs!"
//         });
//       } else res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error finding all rejected jobs" 
//       });
//   });
// }      

                



            //GET  by :id (working)
exports.findJobById = (req, res) =>{
    const id = req.params.id
    SavedJob.findById(
        {_id: id}
    ).then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message:
            err.message || "some error occured in findAll"
        })
    })
}

//route that will save the changes user makes to various statuses in appliedJob document PUT
//what will be updated: heardBack.status, heardBack.closed, appliedTo.appStatus, heardBack.scheduledInterview and appliedTo.date
//NOTE: values that are being passed in may need to change depending on how we decide to set up the button/form on the front end
//NOTE: all three status changes (and two dates) will be together and updated at the same time, need to make sure the previous value is in place when submitting the change 
//changed the set values to what were passing from the front end 
exports.updateStatus = (req, res) => {
  const id = req.params.id;

  SavedJob.findOne({_id: id})
  .then(theJob => {
    const hbStatus = req.body.hbStatus === null ? theJob.heardBack.status : req.body.hbStatus;
    const hbSchInt = req.body.hbSchInt === null ? theJob.heardBack.scheduledInterview : req.body.hbSchInt;
    let hbClosed = req.body.hbClosed === null ? theJob.heardBack.closed : req.body.hbClosed;
    let atStatus = req.body.atStatus === null ? theJob.appliedTo.appStatus : req.body.atStatus;
    const atDate = req.body.atDate === null ? theJob.appliedTo.date : req.body.atDate;

    //if hbStatus is true, auto change atStatus to true
    //if hbClosed is true, auto change atStatus to true
    if(hbStatus == true || hbClosed == true){
      atStatus = true;
      console.log('change')
    }
    //if hbClosed is true, auto change hbStatus to true
    if(hbClosed == true){
      hbStatus = true;
      atStatus = true;
    }
    console.log(atStatus);

    SavedJob.findOneAndUpdate(
      {_id: id},
      {$set: {
        "heardBack.status": hbStatus,
        "heardBack.scheduledInterview": hbSchInt,
        "heardBack.closed": hbClosed,
        "appliedTo.appStatus": atStatus,
        "appliedTo.date": atDate
      }},
      {new: true, upsert: true}, (err, updatedJob) => {
        if(err){
            res.send({message: 'Error when trying to update savedJob status'})
        }
        res.send(updatedJob);
      })
  })
 }


        //PUT   update note array (working)
exports.updateNote = (req, res)=>{
  
    const id= req.params.id
    SavedJob.updateOne(
        {_id: id},
        {"appliedTo.notes": req.body.appliedTo.notes}
    ).then(data => {
      //console.log("THIS IS THE DATA", data)
        if (!data) {
          res.status(404).send({
            message: `Cannot update notes with id=${id}.`
          });
        } else {
          res.send({ message: "note was updated successfully." });
        } 
    })
    .catch(err => {
        res.status(500).send({
          message: "Error updating notes with id=" + id
        });
    });
};




