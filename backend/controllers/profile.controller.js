const db = require('../models/index')
const User = db.user

//this route is connected to the get route for the profile page, it finds the current user and returns it, res.send makes it available to the front end 
exports.displayAll = (req, res) => {
    console.log('YOUR USER', req.userId);
    User.findById(req.userId)
    .then(user => {
        //res.send(user);
        res.send({
            id: user._id,
            username: user.username,
            email: user.email,
            todos: user.todos,
            savedJobs: user.savedJobs,
            codingGoal: user.codingGoal,
            network: user.network
        })
    })
    .catch(err => {
        console.log('ERROR IN DISPLAYALL', err);
        res.send({message: err});
    })
}


//the PUT route for editting todos
exports.editTodos = (req, res) => {
    //findOneAndUpdate is passed {new: true, upsert: true} tells mongoose to return the updated document (without it it will return the document before it was updated)
    User.findOneAndUpdate({_id: req.userId}, {$set: {todos: req.body.todos}}, {new: true, upsert: true}, (err, updatedUser) => {
        if(err){
            res.send({message: 'Error when trying to update user\'s todos'})
        }
        res.send(updatedUser);
        //console.log('UPDATED USER', updatedUser);
    })
}

exports.setGoals = (req, res) => {
    if(req.body.codingGoal){
        User.findOneAndUpdate({_id: req.userId}, {$set: {codingGoal: req.body.codingGoal}}, {new: true, upsert: true}, (err, updatedUser) => {
            if(err){
                res.send({message: 'Error when trying to update user\'s coding goal'})
            }
            res.send(updatedUser);
            //console.log('UPDATED USER', updatedUser);
        })
    } else {
        User.findOneAndUpdate({_id: req.userId}, {$set: {appGoal: req.body.appGoal}}, {new: true, upsert: true}, (err, updatedUser) => {
            if(err){
                res.send({message: 'Error when trying to update user\'s application goal'})
            }
            res.send(updatedUser);
            //console.log('UPDATED USER', updatedUser);
        })
    }
}