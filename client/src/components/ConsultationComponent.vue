<template>
    <div id="main-ConsultationComponent">
        <h1 class="mg-l-40 mg-t-40 mg-b-20">{{ this.patient.nom.toUpperCase() }} {{ this.patient.prenom }} - Consultations</h1>
        <div class="mg-b-10 consultation-container" v-for="consultation in consultations" :key="consultation._id">
            <div>
                <h6 style="font-style:bolder;">Consultation du {{ consultation.date | formatDate }}</h6>
                {{ consultation.commentaire }}
            </div>
            <div>
                <v-tooltip bottom> 
                    <template v-slot:activator="{ on, attrs }">
                        <v-icon
                            color="red"
                            small
                            @click="deleteItem(consultation)"
                            v-bind="attrs"
                            v-on="on"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                    <span>Supprimer</span>
                </v-tooltip>
            </div>
        </div>
        <!-- Modal de confirmation de suppression -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Voulez-vous vraiment supprimer cette consultation ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-btn color="blue darken-1" text @click="dialogDelete = false">Annuler</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Formulaire d'ajout de consultation --> 
        <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    color="#E7827A"
                    v-bind="attrs"
                    v-on="on"
                >
                    Créer une consultation
                </v-btn>
            </template>
            <v-form v-on:submit.prevent="submitForm">
                <v-card>
                    <v-card-title>
                        <span class="text-h5">{{ this.patient.nom.toUpperCase() }} {{ this.patient.prenom }} - Nouvelle consultation</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                >
                                    <v-textarea
                                    v-model="form.commentaire"
                                    name="input-7-1"
                                    label="Commentaire(s)"
                                    ></v-textarea>
                                </v-col>
                            </v-row>
                            <v-row>
                                <template>
                                    <div>
                                        <v-menu
                                            ref="menu"
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    v-model="form.dateFormatted"
                                                    label="Date de naissance"
                                                    prepend-icon="mdi-calendar"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                v-model="date"
                                                locale="fr-FR"
                                                :active-picker.sync="activePicker"
                                                :max="new Date().toISOString().substr(0, 10)"
                                                min="1950-01-01"
                                                @change="save"
                                            ></v-date-picker>
                                        </v-menu>
                                    </div>
                                </template>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            type="submit"
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Valider
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                        >
                            Fermer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
    </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

export default {
    name:"ConsultationComponent",
    data:function() {
        return {
            patient: {
                nom:'',
                prenom:''
            },
            deleteConsultation: null,
            dialogDelete: false,
            consultations: [],
            form: {
                commentaire:'',
                dateFormatted:null,
            },
            id: this.$route.params.id,
            dialog: false,
            activePicker: null,
            menu: false,
            date: null,
        }
    },
    beforeCreate: async function() {
        if (!this.$session.exists()) {
            Swal.fire({
                title:"Accès refusée",
                text:'Vous devez être connecté pour accéder à cette page',
                icon:'error',
                confirmButtonText:'Ok'
            })
            this.$router.push('/')
        }
    },
    async created() {
        await this.getPatient()
        await this.getConsultations()
    },
    methods: {
        async getPatient() {
            await axios.get('http://localhost:8000/patient/findById/' + this.id).then(response => {
                if (response.data.patient) {
                    this.patient = response.data.patient
                }
            })
        },
        async getConsultations() {
            await axios.post('http://localhost:8000/consultation/findByIdPatient',{idPatient:this.id}).then(response => {
                if (response.data.consultations) {
                    this.consultations = response.data.consultations
                }
            })  
        },
        save(date) {
            this.$refs.menu.save(date)
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        parseDate (date) {
            if (!date) return null

            const [month, day, year] = date.split('/')
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
        },
        async submitForm() {
            await axios.post("http://localhost:8000/consultation/createByIdPatient",{idPatient:this.id,commentaire:this.form.commentaire,date:this.form.dateFormatted},{headers:{'Content-Type':'application/json'}}).then(async function(response) {
                if (response.data.consultation) {
                    Swal.fire({
                        title:"Action effectuée",
                        text:"La consultation a correctement été ajoutée.",
                        icon:'success',
                        confirmButtonText:'Ok'
                    })
                }
            })
            this.getConsultations()
        },
        deleteItem(consultation) {
            this.dialogDelete = true
            this.deleteConsultation = consultation

        },
        deleteItemConfirm() {
            axios.post("http://localhost:8000/consultation/deleteById",{id:this.deleteConsultation._id}).then(response => {
                Swal.fire({
                    title:"Action effectuée",
                    text:"La consultation a correctement été supprimée.",
                    icon:'success',
                    confirmButtonText:'Ok'
                })
            })
            this.dialogDelete = false
            this.getConsultations()
        }
    },
    watch: {
        menu(val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
        date(val) {
            this.form.dateFormatted = moment(this.date).format('DD/MM/YYYY')
        }
    },
}
</script>

<style scoped>
    #main-ConsultationComponent {
        padding:15px;
    }

    .consultation-container {
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color:white;
        padding:15px;
        display:flex;
        justify-content:space-between;
        border-radius:5px;
    }
</style>