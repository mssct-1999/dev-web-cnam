<template>
    <div style="display:flex;justify-content:center;align-items:center;height:60vh;">
        <div id="containerForm">
            <span id="title-form">Formulaire de connexion</span>
            <v-form v-on:submit.prevent="submitForm">
                <v-container>
                    <v-row class="mg-t-10">
                        <v-col
                        cols="12"
                        md="12"
                        >
                            <v-text-field
                            v-model="form.login"
                            label="Identifiant"
                            prepend-icon="fas fa-user"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col
                        cols="12"
                        md="12"
                        >
                            <v-text-field
                            v-model="form.password"
                            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="showPass ? 'text' : 'password'"
                            label="Mot de passe"
                            prepend-icon="fas fa-lock"
                            @click:append="showPass = !showPass"
                            required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-btn
                            :disabled="false"
                            color="success"
                            class="mr-4"
                            type="submit"
                        >
                            Connexion
                        </v-btn>
                    </v-row>
                </v-container>
            </v-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    name:"LoginComponent",
    data:function() {
        return {
            form: {
                login:'',
                password:''
            },
            showPass:false,
        }
    },
    methods: {
        async submitForm() {
            await axios.post("http://localhost:8000/utilisateur/login",{login:this.form.login,password:this.form.password},{headers:{'Content-Type':'application/json'}}).then((response) => {
                if (response.data.user) {
                    let user = response.data.user;
                    this.$session.set('identite',user.prenom + " " + user.nom)
                    this.$session.start()
                    this.$router.push({name:'admin'})
                }
                else {
                    Swal.fire({
                        title:"Une erreur s'est produite",
                        text:"L'identifiant ou le mot de passe sont incorrect",
                        icon:'error',
                        confirmButtonText:'Ok'
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
  #containerForm {
    background-color:white;
    border-radius:5px;
    padding: 50px;
    width:500px;
  }

  #title-form {
    font-weight:bolder;
  }
</style>