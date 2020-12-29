
const network  = require('../controllers/network.controller')
const { authJwt } = require('../middlewares')

module.exports = app =>{
    app.post("/newnetwork", [authJwt.verifyWebToken], network.createNetwork)


    app.get("/findnetwork", [authJwt.verifyWebToken], network.findNetwork)
}
