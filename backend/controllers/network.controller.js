const db = require('../models/index')
const User = db.user
const Network = db.network


// POST Add a Network
exports.createNetwork = (req,res) =>{
const network = new Network (req.body);
network.save();
User.findById({_id: req.userId})
.then(foundUser=>{
    foundUser.network.push(network);
    foundUser.save()
    res.send(foundUser);
})
.catch(err=>{
    res.send({message:err})
})
    }

// GET Find a Network
exports.findNetwork = (req, res) =>{
    User.findOne({
      _id:req.userId
    })
    .populate('network').
    exec(function(err, user){
      if (err) return handleError(err)
      res.send(user.network)
    })
  }