const mongoose = require("mongoose")

const User = mongoose.model(
    "User",
    new mongoose.Schema({
       username: String,
       email: String,
       password: String,
       roles: [
            {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Role"
           }
       ],
       todos: [],
       savedJobs: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SavedJob"
            }
       ],
       codingGoal: {
          goal: {type: Number, default: 0},
          progress: {type: Number, default: 0}

       },
       appGoal: {
            goal: {type: Number, default: 0},
            progress: {type: Number, default: 0}
       },
       network: [
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Network"
            }
        ]
    })
)

module.exports = User