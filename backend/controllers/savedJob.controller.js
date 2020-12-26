const db = require('../models/index')
const SavedJob = db.savedJob


exports.create = (req, res) =>{

    const savedJob = new SavedJob({
        location: req.params.title,
        language: req.params.language,
        company: req.params.company,
        jobTitle: req.params.jobTitle,
        heardBack: {
            status: req.body.status,
            scheduledInterview: req.body.scheduledInterview,
            closed: req.body.closed,
        },
        appliedTo: {
            appStatus: req.body.appStatus,
            date: req.body.date,
            notes: [
                req.body.notes
            ]
        }
    })
}

