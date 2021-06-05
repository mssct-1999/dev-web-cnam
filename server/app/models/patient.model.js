const mongoose = require('mongoose')


const patientSchema = mongoose.Schema(
    {
        nom:String,
        prenom:String,
        dateNaiss: Date
    }
);

const Patient = mongoose.model("Patient",patientSchema);
module.exports = Patient;