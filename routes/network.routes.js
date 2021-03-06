
const network  = require('../controllers/network.controller')
const { authJwt } = require('../middlewares')

module.exports = app =>{
    //This route creates a new network to a user
    app.post("/newnetwork", network.createNetwork)
    //This route finds an existing user's network
    app.get("/findnetwork",[authJwt.verifyWebToken], network.findNetwork )
    //This route deletes an exsiting user's network. 
    app.delete("/deletenetwork/:id", network.deleteNetwork )
    // This route edits the network
    app.put("/updatenetwork/:id", network.editNetwork)
}
