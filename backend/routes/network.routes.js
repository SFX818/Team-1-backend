
const network  = require('../controllers/network.controller')
const { authJwt } = require('../middlewares')

module.exports = app =>{
    //creates a new network
    app.post("/newnetwork", [authJwt.verifyWebToken], network.createNetwork)

    //find all networks
    app.get("/findnetwork", [authJwt.verifyWebToken], network.findNetwork)

    //edit the notes
    app.put("/updatenetwork/:id", network.updateNetwork)
}
