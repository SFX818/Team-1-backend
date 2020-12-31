const savedJob  = require('../controllers/savedJob.controller')
const { verifySignup } = require('../middlewares/')
const { authJwt } = require('../middlewares')
const SavedJob = require('../models/savedJob.model')


module.exports = app => {

    //GET route that will get all savedJobs specific to user and organize them by status
    app.get("/profile/savedJobs", [authJwt.verifyWebToken], savedJob.findAllJobs)

    //POST route that creates a new saved job and assigns it to the current user
    app.post("/newsavedjob", [authJwt.verifyWebToken], savedJob.saveAJob)
   
    //delete a saved job (working)
    app.delete("/savedjob/:id", savedJob.delete)

    //update the note array inside appliedTo Object (working)
    app.put("/updatenote/:id", savedJob.updateNote)

    // retrieve a job by its id (working)
    app.get("/findjob/:id", savedJob.findJobById)

    //route that is able to grab and save updated statuses on their saved jobs
    // app.put("/changestatus/:id", [authJwt.verifyWebToken], savedJob.updateStatus)
    app.put("/changestatus/:id", savedJob.updateStatus)
}


