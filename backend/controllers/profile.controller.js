const db = require('../models/index')
const User = db.user

//this route is connected to the get route for the profile page, it finds the current user and returns it, res.send makes it available to the front end 
exports.displayAll = (req, res) => {
    console.log('YOUR USER', req.userId);
    User.findById(req.userId)
    .then(user => {
        res.send(user)
    })
    .catch(err => {
        console.log('ERROR IN DISPLAYALL', err);
        res.send({message: err});
    })
}

exports.editTodos = (req, res) => {
    console.log('reach route');
    console.log(req.userId);
    console.log(req.body.todos);
    // User.updateOne({_id: req.body.id}, {todos: req.body.todos})
    // .then(updatedUser => {
    //     res.send(updatedUser);
    //     console.log('UPDATED USER', updatedUser);
    // })
    // .catch(err => {
    //     console.log('ERROR IN EDITTODOS');
    //     res.send({message: err});
    // })
    User.findOneAndUpdate({_id: req.userId}, {$set: {todos: req.body.todos}}, {new: true, upsert: true}, (err, updatedUser) => {
        if(err){
            res.send({message: 'Error when trying to update users todos'})
        }
        res.send(updatedUser);
        console.log('UPDATED USER', updatedUser);
    })
}