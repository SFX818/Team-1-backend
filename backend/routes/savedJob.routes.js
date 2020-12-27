const savedJob  = require('../controllers/savedJob.controller')

module.exports = app =>{
    
    //retrieve all saved jobs
    app.get("/savedJob", savedJob.findAll)
    
    //save job to db
    app.post("/newsavedjob", savedJob.create)

    //delete a saved job
    app.delete("/savedjob/:id", savedJob.delete)

    // retrieve all the jobs user heard back from
    app.get("/heardback", savedJob.findAllHeardBack)

    // retrieve all the jobs user has applied for
    app.get("/appliedto", savedJob.findAllAppliedTo)

    //update the note array inside appliedTo Object
    app.put("/updatenote/:id", savedJob.updateNote)

    // retrieve a job by its id
    app.get("/findjob/:id", savedJob.findJobById)
}