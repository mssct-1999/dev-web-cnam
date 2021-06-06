const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const consultationSchema = mongoose.Schema(
    {
        date:Date,
        commentaire: {
            type:String,
            default:null
        },
        patient: [
            {
                type:Schema.Types.ObjectId, 
                ref: 'Patient'
            }
        ],
    }
);

const Consultation = mongoose.model('Consultation',consultationSchema);
module.exports = Consultation;