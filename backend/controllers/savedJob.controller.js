const { savedJob } = require('../models/index');
const db = require('../models/index')
const SavedJob = db.savedJob


exports.create = (req, res) =>{
                                    //POST ROUTE
    const savedJob = new SavedJob({
        location: req.body.title,
        language: req.body.language,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        heardBack: {
            status: req.body.heardBack.status,
            scheduledInterview: req.body.heardBack.scheduledInterview,
            closed: req.body.heardBack.closed,
        },
        appliedTo: {
            appStatus: req.body.appliedTo.appStatus,
            date: req.body.appliedTo.date,
            notes: [
                req.body.appliedTo.notes
            ]
        }
    })
    savedJob.save(savedJob)
    .then((data)=>{
        res.send(data)
})
.catch((err)=>{
    res.status(500).send({
        message:
        err.message || "some error occured"
    });
});
}



                    // GET ROUTE 
exports.findAll = (req, res) =>{
    SavedJob.find()
    .then((data)=>{
        res.send(data);
    })
    .catch((err)=>{
        res.status(500).send({
            message:
            err.message || "some error occured in findAll"
        })
    })
}

