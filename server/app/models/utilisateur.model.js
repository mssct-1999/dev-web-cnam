const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const utilisateurSchema = mongoose.Schema(
    {
        nom:String,
        prenom:String,
        login:String,
        password:String,
        is_admin:Boolean
    },
    {timestamps:true}
);
    
/**
* Description: Hachage du mot de passe avant sauvegarde du model Utilisateur
*/
utilisateurSchema.pre("save", async function() {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8);
    }
});

/**
 * Description: Recherche d'utilisateur à partir d'un couple identifiant-mot de passe
 * @param {*} login 
 * @param {*} password 
 * @returns 
 */
utilisateurSchema.statics.findByCredentials = async (login,password) => {
    const user = await Utilisateur.findOne({login:login});
    if (!user) {
        throw new Error({error: "Login invalide"});
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    console.log(isPasswordMatch)
    if (!isPasswordMatch) {
        throw new Error({error:"Mot de passe invalide"});
    }
    return user;
};

const Utilisateur = mongoose.model("Utilisateur",utilisateurSchema);
module.exports = Utilisateur;