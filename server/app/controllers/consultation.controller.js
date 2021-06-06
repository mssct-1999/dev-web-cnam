const db = require('../models');
const Consultation = require('../models/consultation.model')

/**
 * Fonction: findByPatientId
 * Description: Retourne la liste des consultations effectuées pour le patient dont l'id est passé en paramètre.
 */
exports.findByPatientId = async (req,res) => {
    try {
        var idPatient = req.body.idPatient;
        Consultation.find({patient:idPatient}, null, {sort:{date:-1}}, (err,consultations) => {
            if (err) {
                res.status(400).json({err:err})
            }
            else {
                res.status(201).json({ consultations })
            }
        })
    } 
    catch(err) {
        res.status(400).json({ err:err})
    }
}

/**
 * Fonction: createByPatientId
 * Description: Créé une consultation pour le patient dont l'id est passé en paramètre
 */
 exports.createByPatientId = async (req,res) => {
    try {
        var idPatient = req.body.idPatient;
        var dateConsult = req.body.date;
        var commentaire = req.body.commentaire;
        const splitDate = dateConsult.split('/')
        var year = parseInt(splitDate[2]);
        var month = parseInt(splitDate[1])-1;
        var day = parseInt(splitDate[0]);
        const date = new Date(Date.UTC(year,month,day));
        const consultation = new Consultation({
            date:date,
            patient:idPatient,
            commentaire:commentaire
        });
        let data = await consultation.save();
        console.log("(Consultation.controller.create) - Consultation créé : " + consultation)
        res.status(201).json({ consultation })
    } 
    catch(err) {
        res.status(400).json({err:err});
    }
}

/**
 * Fonction: deleteById
 * Description: Supprime une consultation dont l'identifiant est passé en paramètre
 */
exports.deleteById = async (req,res) => {
    try {
        var id = req.body.id;
        Consultation.findByIdAndDelete(id, (err) => {
            if (err) {
                console.log("(Consultation.controller.deleteById) - Erreur lors de la suppression : " + err)
            }
            else {
                console.log("(Consultation.controller.deleteById) - Consultation supprimée [ID: " + id + "]");
            }
        });
    } catch(err) {
        res.status(400).json({err:err});
    }
}