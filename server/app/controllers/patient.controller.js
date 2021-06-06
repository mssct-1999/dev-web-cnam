const db = require('../models');
const Patient = require('../models/patient.model')

/**
 * Fonction: create
 * Description: Création d'un nouveau patient
 */
exports.create = async (req,res) => {
    try {
        var nom = req.body.nom;
        var prenom = req.body.prenom;
        var dateNaiss = req.body.dateNaiss;
        const splitDate = dateNaiss.split('/')
        var year = parseInt(splitDate[2]);
        var month = parseInt(splitDate[1])-1;
        var day = parseInt(splitDate[0]);
        const date = new Date(Date.UTC(year,month,day));
        const patient = new Patient({
            nom:nom,
            prenom:prenom,
            dateNaiss: date
        });
        let data = await patient.save();
        console.log("(Patient.controller.create) - Patient créé : " + patient);
        res.status(201).json({ patient });
    } catch(err) {
        res.status(400).json({err:err});
    }
}

/**
 * Fonction: findAll
 * Description: Retourne tous les éléments de la collection Patient
 */
exports.findAll = async (req,res) => {
    try {
        Patient.find({}, function(err, patients) {
            res.status(201).json({ patients })
        })
    } catch(err) {
        res.status(400).json({err:err})
    }
};

/**
 * Fonction: deleteById
 * Description: Supprime l'objet Patient de la collection dont l'id est passé en paramètre.
 */
exports.deleteById = async(req,res) => {
    try {
        var id = req.body._id;
        Patient.findByIdAndDelete(id, (err) => {
            if (err) {
                console.err("(Patient.controller.deleteById) - Erreur lors de la suppression du patient : " + err);
            }
            else {
                console.log('(Patient.controller.deleteById) - Patient supprimé [ID:' + id + "]");
            }
        })
        res.status(201).json({"delete":"ok"})
    }
    catch(err) {
        res.status(400).json({err:err})
    }
}

/**
 * Fonction: edit
 * Description: Modifie les informations d'un objet Patient.
 */
exports.edit = async (req,res) => {
    try {
        var id = req.body._id;
        var prenom = req.body.prenom;
        var nom = req.body.nom;
        var dateNaiss = req.body.dateNaiss;
        const splitDate = dateNaiss.split('/')
        var year = parseInt(splitDate[2]);
        var month = parseInt(splitDate[1])-1;
        var day = parseInt(splitDate[0]);
        const date = new Date(Date.UTC(year,month,day));
        Patient.findByIdAndUpdate(id, {prenom:prenom,nom:nom,dateNaiss:date}, {useFindAndModify:false}, (err) => {
            if (err) {
                console.log("(Patient.controller.edit) - Erreur lors de la modification du patient : " + err)
            }
            else {
                console.log("(Patient.controller.edit) - Patient modifié [ID:" + id + "]")
            }
        })
        res.status(201).json({"update":"ok"})
    } catch(err) {
        res.status(400).json({err:err})
    }
}

/**
 * Fonction: findById
 * Description: Retourne les informations d'un patient dont l'id est passé en paramètre.
 */
exports.findById = async (req,res) => {
    try {
        var id = req.params.id;
        console.log(id)
        Patient.findById(id, function(err,patient) {
            if (err) {
                console.log("(Patient.controller.findById) - Erreur lors de la récupération du patient : " + err);
            } 
            else {
                console.log("(Patient.controller.findById) -Patient retourné " + patient)
                res.status(201).json({patient:patient})
            }
        })
    } catch(err) {
        res.status(400).json({err:err})
    }
}
