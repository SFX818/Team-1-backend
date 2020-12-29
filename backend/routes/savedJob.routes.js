const savedJob  = require('../controllers/savedJob.controller')
const { verifySignup } = require('../middlewares/')
const { authJwt } = require('../middlewares')


module.exports = app => {
    
    //POST route that creates a new saved job and assigns it to the current user
    app.post("/newsavedjob", [authJwt.verifyWebToken], savedJob.saveAJob)

    //delete a saved job (working)
    app.delete("/savedjob/:id", savedJob.delete)

    //update the note array inside appliedTo Object (working)
    app.put("/updatenote/:id", savedJob.updateNote)

    // retrieve a job by its id (working)
    app.get("/findjob/:id", savedJob.findJobById)

    app.put("/updatestatus/:id", savedJob.updateStatus)
}