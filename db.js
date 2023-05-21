
const mongoose = require('mongoose');
var mongoURL ="mongodb+srv://ss05479:56d7gmv3kx@cluster0.kyfy5gj.mongodb.net/Hotalbackend"

mongoose.connect(mongoURL,{useUnifiedTopology : true , useNewUrlParser : true})

var connection =  mongoose.connection;

connection.on('error', () => {
    console.log('mongodb connection failed');
})

connection.on('connected', () => {
    console.log('mongodb is connected successfully');
})

module.exports = mongoose;