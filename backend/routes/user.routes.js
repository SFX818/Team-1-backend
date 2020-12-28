const { authJwt } = require('../middlewares')
const controller = require('../controllers/user.controller')
const savedJobController = require('../controllers/savedJob.controller')
const profileController = require('../controllers/profile.controller')

module.exports = function(app) {
    app.use( (req,res, next) => {
        // set header and allow use of x access token ( we will use this to pass our token )
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        );
        next();
    })

    app.get("/savedJob", [authJwt.verifyWebToken], savedJobController.findAll)

    app.get("/api/test/all", controller.allAccess)

    app.get("/api/test/user", [authJwt.verifyWebToken], controller.userBoard)

    app.get("/api/test/admin", [authJwt.verifyWebToken, authJwt.isAdmin],
    controller.adminBoard
    )

    //NOTE: do we need this if we are able to access it in the front end via getCurrentUser?
    //route that will provide the front end with the info it needs to display on the profile home page: todos, app and coding goals 
    app.get("/profile", [authJwt.verifyWebToken], profileController.displayAll);

     //route to edit todos PUT 
    app.put("/profile/todos", [authJwt.verifyWebToken], profileController.editTodos);

    //route to edit goals: both app and coding
    app.put("/profile/goals", [authJwt.verifyWebToken], profileController.setGoals);
}
