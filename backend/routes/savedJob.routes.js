const savedJob  = require('../controllers/savedJob.controller')
const { verifySignup } = require('../middlewares/')
const { authJwt } = require('../middlewares')


module.exports = app =>{
    
    //POST route that creates a new saved job and assigns it to the current user
    app.post("/newsavedjob", [authJwt.verifyWebToken], savedJob.saveAJob)

    //delete a saved job
    app.delete("/savedjob/:id", savedJob.delete)

    // retrieve all the jobs user heard back from
    app.get("/heardback",[authJwt.verifyWebToken], savedJob.findAllHeardBack)

    // retrieve all the jobs user has applied for
    app.get("/appliedto", [authJwt.verifyWebToken], savedJob.findAllAppliedTo)

    //update the note array inside appliedTo Object
    app.put("/updatenote/:id", savedJob.updateNote)

    // retrieve a job by its id
    app.get("/findjob/:id", savedJob.findJobById)

    //retrieve all jobs user was rejected from
    app.get("/rejected", savedJob.findAllRejected)
}