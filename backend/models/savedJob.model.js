const mongoose = require("mongoose")


const SavedJob = mongoose.model(
    "SavedJob",
    new mongoose.Schema({
       location: String,
       language: String,
       company: String,
       jobTitle: String,
       heardBack: {
           status: Boolean,
           scheduledInterview: Date,
           closed: Boolean
        }, 
        appliedTo: {
            appStatus: Boolean,
            date: Date,
            notes: [],
        }
    })
)

module.exports = SavedJob