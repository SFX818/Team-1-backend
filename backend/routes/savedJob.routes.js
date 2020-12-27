const savedJob  = require('../controllers/savedJob.controller')

module.exports = app =>{
    
    //retriever all tutorials
    app.get("/savedJob", savedJob.findAll)
    
    
    //saves a job to db
    app.post("/newsavedjob", savedJob.create)


    //delete a saved job
    app.delete("/savedjob/:id", savedJob.delete)



}