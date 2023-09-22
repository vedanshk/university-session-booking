const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({

    university_id : { type: String , required: true} ,
    password: {type: String , required: true}

});

module.exports = mongoose.model('Student' , studentSchema);


