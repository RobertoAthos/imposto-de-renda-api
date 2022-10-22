const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
        email: {type: String, required: true},
        fullName: {type:String, required: true, minLenght:2, maxLenght:30},
        data: {type: Date, required: true},
        cpf: {type: String, required: true},
        password: {type: String, required:true}

})


module.exports = mongoose.model('users', UserSchema)