const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose
db.user = require('./user.model')
db.role = require('./role.model')
db.network = require('./network.model')
db.savedJobs = require('./savedJobs.model')

db.Roles = ['users', 'admin']

module.exports = db