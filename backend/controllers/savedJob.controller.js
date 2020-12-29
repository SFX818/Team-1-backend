const { savedJob } = require('../models/index');
const db = require('../models/index');
const { populate } = require('../models/user.model');
const SavedJob = db.savedJob
const User = db.user



//POST route thats connected to /newsavedjob: will create and save a new job and add it to the current user
//(THIS IS WORKING, LEAVE IT ALONE)
exports.saveAJob = (req, res) => {
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

// GET all jobs  (working)
//(THIS IS WORKING, LEAVE IT ALONE) 
exports.findAll = (req, res) =>{
  console.log("AHHHHHHHHHHHHHHHHHH", req.userId)
  User.findOne({
    _id:req.userId
  })
  .populate('savedJobs').
  exec(function(err, user){
    if (err) return handleError(err)
    res.send(user.savedJobs)
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
        } else res.send({ message: "saved job was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Tutorial with id=" + id
        });
      });
  };

//GET  heardback: true
//(THIS IS WORKING, LEAVE IT ALONE)  
exports.findAllHeardBack = (req, res)=>{
  User.findOne({
    _id:req.userId
  })
  .populate('savedJobs').
  exec(function(err, user){
    if (err) return handleError(err)
    // res.send(user.savedJobs.heardBack===true)
    const heardBackJobs = []
    user.savedJobs.map(job=>{
      console.log('THIS IS THE JOBBBBBBB', job)
    if(job.heardBack.status===true){
      heardBackJobs.push(job)
    }
    })
    res.send(heardBackJobs)
  })
}

 //GET  applied: true  (working)
//WORKING ROUTE, LEAVE IT ALONE XOXOXOXO
exports.findAllAppliedTo = (req, res)=>{
  User.findOne({
    _id:req.userId
  })
  .populate('savedJobs').
  exec(function(err, user){
    if (err) return handleError(err)
    // res.send(user.savedJobs.heardBack===true)
    const appliedJobs = []
    user.savedJobs.map(applied=>{
      console.log('WE APPLIED FOR THIS', applied)
    if(applied.appliedTo.appStatus===true){
      appliedJobs.push(applied)
    }
    })
    res.send(appliedJobs)
  })
}




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




        //PUT   update note array (working)
exports.updateNote = (req, res)=>{
    const id= req.params.id

    SavedJob.update(
        {_id: id},
        // {language: req.body.language}
        {"appliedTo.notes": req.body.notes}
    ).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update notes with id=${id}.`
          });
        } else res.send({ message: "note was updated successfully." });
      })
    .catch(err => {
        res.status(500).send({
          message: "Error updating notes with id=" + id
        });
    });
};



        // GET closed: true (working)
exports.findAllRejected = (req, res)=>{
    SavedJob.find({"heardBack.closed": true} )
    .then(data => {
        if (!data) {
          res.status(404).send({
            message: "Cannot find all rejected jobs!"
          });
        } else res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error finding all rejected jobs" 
        });
    });
}        












                        //GET (by heardback: true)
//   exports.findAllHeardBack = (req, res)=>{
//     SavedJob.find({location:"boston"})
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
//       });
//     }
