const mongoose = require("mongoose")

const Network = mongoose.model(
    "Network",
    new mongoose.Schema({
       name: String,
       company: String,
       phone: String,
       email: String,
       notes: [] 
    })
)

module.exports = Network