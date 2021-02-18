module.exports = mongoose => {
    const Utilisateur = mongoose.model(
        "utilisateur",
        mongoose.Schema(
            {
                nom:String,
                prenom:String,
                login:String,
                password:String,
                is_admin:Boolean
            },
            {timestamps:true}
        )
    );

    return Utilisateur;
};