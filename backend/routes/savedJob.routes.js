const savedJob  = require('../controllers/savedJob.controller')

module.exports = app =>{
    
    //retrieve all saved jobs
    app.get("/savedJob", savedJob.findAll)
    
    //saves a job to db
    app.post("/newsavedjob", savedJob.create)

    //delete a saved job
    app.delete("/savedjob/:id", savedJob.delete)

    // retrieve all the jobs user heard back from
    app.get("/heardback", savedJob.findAllHeardBack)

    // retrieve all the jobs user has applied for
    app.get("/appliedto", savedJob.findAllAppliedTo)




}