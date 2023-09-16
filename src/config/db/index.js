const mongoose = require('mongoose')
 
async function connect () {
    try {
        mongoose.connect(process.env.MONGODB,{})
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {connect}