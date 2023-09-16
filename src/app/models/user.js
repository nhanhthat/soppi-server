const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Link = new Schema({
    content : {type : String},
    status : {type : Number, default : 0},
    queue : {type : Number}
},{timestamps : true})

module.exports = mongoose.model('links', Link)