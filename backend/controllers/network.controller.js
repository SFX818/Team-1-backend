const db = require("../models/index");
const User = db.user;
const Network = db.network;

// POST Add a Network
exports.createNetwork = (req, res) => {
  //Creating a new Network with what the user is putting in form in req.body
  const network = new Network(req.body);
  //Save new network
  network.save();
  //Finding the User by their id which is what our currentUser is
  User.findById({ _id: req.body.currentUser })
    .then((foundUser) => {
      foundUser.network.push(network);
      foundUser.save();
      res.send(foundUser);
    })
    .catch((err) => {
      res.send({ message: err });
    });
};

// GET Find a Network
exports.findNetwork = (req, res) => {
  User.findOne({
    _id: req.userId,
  })
    .populate("network")
    .exec(function (err, user) {
      if (err) return handleError(err);
      res.send(user.network);
    });
};

// DELETE Delete a Network
exports.deleteNetwork = (req, res) => {
  const id = req.params.id;
  Network.remove({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete id=${id}. fix the delete controller!`,
        });
      } else res.send({ message: "network was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting network with id=" + id,
      });
    });
};

//PUT Edit a Network
//this updated version of the editNetwork function/route was written to avoid overwriting values to null when nothing is passed in req.body. First grabbing the values that were in the database with the initial findOne, and then doing an Update with changing variables depending
exports.editNetwork = (req, res) => {
  const id = req.params.id;
  Network.findOne({ _id: id }).then((foundNetwork) => {
    const name =
      req.body.name === undefined ? foundNetwork.name : req.body.name;
    const company =
      req.body.company === undefined ? foundNetwork.company : req.body.company;
    const phone =
      req.body.phone === undefined ? foundNetwork.phone : req.body.phone;
    const email =
      req.body.email === undefined ? foundNetwork.email : req.body.email;
    const notes =
      req.body.notes === undefined ? foundNetwork.notes : req.body.notes;
    Network.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          company: company,
          phone: phone,
          email: email,
          notes: notes,
        },
      },
      { new: true, upsert: true },
      (error, updatedNetwork) => {
        if (error) res.send(error);
        res.send(updatedNetwork);
      }
    );
  });

};
