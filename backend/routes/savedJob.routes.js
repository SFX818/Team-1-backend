const savedJob  = require('../controllers/savedJob.controller')

module.exports = app =>{
    
    //retriever all tutorials
    app.get("/savedJob", savedJob.findAll)
    
    
    //route that saves a job to db
    app.post("/newsavedjob", savedJob.create)







}