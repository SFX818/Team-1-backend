const config = require('../config/auth.config')
const db = require('../models/index')
// Access to our db through User and Role varible
const User = db.user


exports.allAccess = (req,res) => {
    res.status(200).send("public content")
}

exports.userBoard = (req,res) => {
    res.status(200).send("User content")
}

exports.adminBoard = (req,res) => {
    res.status(200).send("Admin content")
}
