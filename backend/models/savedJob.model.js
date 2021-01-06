const mongoose = require("mongoose")


const SavedJob = mongoose.model(
    "SavedJob",
    new mongoose.Schema({
        jobId: String,
        jobUrl: String,
       location: String,
       language: String,
       company: String,
       jobTitle: String,
       heardBack: {
            status: {type: Boolean, default: false},
            scheduledInterview: Date,
            closed: {type: Boolean, default: false}
        }, 
        appliedTo: {
            appStatus: {type: Boolean, default: false},
            date: Date,
            notes: []
        }
    })
)

module.exports = SavedJob