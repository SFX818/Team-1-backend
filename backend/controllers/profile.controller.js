const { user } = require('../models/index')
const db = require('../models/index')
const User = db.user

//this route is connected to the get route for the profile page, it finds the current user and returns it, res.send makes it available to the front end 
exports.displayAll = (req, res) => {
    User.findById(req.userId)
    .then(user => {
        res.send({
            id: user._id,
            username: user.username,
            email: user.email,
            todos: user.todos,
            savedJobs: user.savedJobs,
            codingGoal: {goal: user.codingGoal.goal, progress: user.codingGoal.progress},
            appGoal: {goal: user.appGoal.goal, progress: user.appGoal.progress},
            network: user.network
        })
    })
    .catch(err => {
        
        res.send({message: err});
    })
}


//the PUT route for editing todos
exports.editTodos = (req, res) => {
    //findOneAndUpdate is passed {new: true, upsert: true} tells mongoose to return the updated document (without it it will return the document before it was updated)
    User.findOneAndUpdate({_id: req.body.id}, {$set: {todos: req.body.todos}}, {new: true, upsert: true}, (err, updatedUser) => {
        if(err){
            res.send({message: 'Error when trying to update user\'s todos'})
        }
        res.send(updatedUser.todos);
        
    })
}

//PUT route for editing goals, it is a 2 in one, the if statement will check which is being sent and update accordingly 
exports.setGoals = (req, res) => {
    User.findOne({_id: req.body.id})
    .then(theGoal =>{
        console.log("THIS IS THE GOAL", theGoal)
        const codingGoal = req.body.codingGoal === null ? theGoal.codingGoal.goal : req.body.codingGoal;
        const codingProgress = req.body.codingProgress === null ? theGoal.codingGoal.progress : req.body.codingProgress;
        const appGoal = req.body.appGoal === null ? theGoal.appGoal.goal : req.body.appGoal;
        const appProgress = req.body.appProgress === null ? theGoal.appGoal.progress : req.body.appProgress;
        //the code below works for postman, the code above is used for the front end.
        // const codingGoal = req.body.codingGoal.goal === undefined ? theGoal.codingGoal.goal : req.body.codingGoal.goal;
        // const codingProgress = req.body.codingGoal.progress === undefined ? theGoal.codingGoal.progress : req.body.codingGoal.progress;
        // const appGoal = req.body.appGoal.goal === undefined ? theGoal.appGoal.goal : req.body.appGoal.goal;
        // const appProgress = req.body.appGoal.progress === undefined ? theGoal.appGoal.progress : req.body.appGoal.progress;


        User.findOneAndUpdate(
            {_id: req.body.id},
            {$set:{
                "codingGoal.goal": codingGoal,
                "codingGoal.progress": codingProgress,
                "appGoal.goal": appGoal,
                "appGoal.progress": appProgress   
            }},{new: true, upsert: true }, (err, updatedGoal) => {
                if(err){
                    res.send({message: 'Error when trying to update app or coding goal', err})
                }
                updatedGoal.save();
                res.send(updatedGoal);
              })
          })
         }

