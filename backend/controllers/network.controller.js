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

    