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

exports.findNetwork = (req, res) =>{
    console.log("AHHHHHHHHHHHHHHHHHH", req.userId)
    User.findOne({
      _id:req.userId
    })
    .populate('network').
    exec(function(err, user){
      if (err) return handleError(err)
      res.send(user.network)
    })
  }    


  exports.updateNetwork = (req, res) =>{
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
    // ).then(data => {
    //   console.log("THIS IS THE DATAAAA", data)
    //     if (!data) {
    //       res.status(404).send({
    //         message: `Cannot update network with id=${id}.`
    //       });
    //     } else {
    //       res.send({ message: "network was updated successfully." });
    //     } 
    // })
    // .catch(err => {
    //     res.status(500).send({
    //       message: "Error updating notes with id=" + id
    //     });
    // });
  }