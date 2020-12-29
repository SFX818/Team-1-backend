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
  exports.findNetwork = (req,res) =>{
  User.findOne({
    _id:req.userId
  })
  .populate('network').
  exec(function(err, user){
    if (err) return handleError(err)
    res.send(user.network)
  })
}

// DELETE Delete a Network
exports.deleteNetwork = (req, res) =>{
    const id = req.params.id
   Network.remove(
        {_id: id},
    ).then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete id=${id}. fix the delete controller!`
          });
        } else res.send({ message: "network was deleted successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error deleting Tutorial with id=" + id
        });
      });
  };

//PUT Edit a Network
exports.editNetwork = (req,res) => {
  const id= req.params.id
  Network.findOneAndUpdate(
      {_id: id},
      {$set:{name: req.body.name,
      company: req.body.company,
      phone: req.body.phone,
      email: req.body.email,
      notes: req.body.notes}},{new: true, upsert: true},(error, updatedNetwork)=>{
          if (error){
              res.send(error)
          }
          res.send(updatedNetwork)
      })
  }

    
    
    
    
    
    
    
    
    
