const dbConfig = require('../config/db.config')

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url 
db.utilisateurs = require('./utilisateur.model')(mongoose)
db.patients = require('./patient.model')(mongoose)
db.consultations = require('./consultation.model')(mongoose)

module.exports = db