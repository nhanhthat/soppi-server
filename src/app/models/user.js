const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Link = new Schema({
    content : {type : String},
    status : {type : Number, default : 0},
    queue : {type : Number},
    delete1 : {type : Boolean, default : false}
},{timestamps : true})

module.exports = mongoose.model('links', Link)