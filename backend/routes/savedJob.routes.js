const savedJob  = require('../controllers/savedJob.controller')
let router = require("express").Router();

module.exports = app =>{

    //route that saves a job to db
    router.post("/", savedJob.create)

    //retriever all tutorials
    // router.get("/", savedJob.findAll)






}