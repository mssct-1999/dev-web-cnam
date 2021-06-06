<template>
    <div id="main-PatientComponent">
        <h1 class="mg-l-40 mg-t-40">Gestion des patients</h1>
        <div class="mg-b-20 mg-t-30" id="patients-container">      
            <template>
                <div>
                    <v-data-table
                    :headers="headers"
                    :items="patients"
                    item-key="_id"
                    class="elevation-1"
                    :search="search"
                    >
                        <template v-slot:top>
                            <v-text-field
                            v-model="search"
                            label="Rechercher (En Majuscule)"
                            class="mx-4"
                            ></v-text-field>
                        </template>
                        <template v-slot:item.dateNaiss="{ item }">
                                <span>{{ new Date(item.dateNaiss).toLocaleDateString() }}</span>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        small
                                        class="mr-2"
                                        @click="editItem(item)"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        mdi-pencil
                                    </v-icon>
                                </template>
                                <span>Modifier</span>
                            </v-tooltip>
                            <v-tooltip bottom> 
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                        small
                                        @click="deleteItem(item)"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        mdi-delete
                                    </v-icon>
                                </template>
                                <span>Supprimer</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-icon
                                    color="grey"
                                    dark
                                    v-bind="attrs"
                                    v-on="on"
                                    style="font-size:13px;"
                                    class="mg-l-10"
                                    @click="showConsultation(item)"
                                    >
                                    fas fa-file-medical
                                    </v-icon>
                                </template>
                                <span>Consultations</span>
                            </v-tooltip>
                            </template>
                            <template v-slot:no-data>
                            <v-btn
                                color="primary"
                              
                            >
                                Reset
                            </v-btn>
                        </template>
                    </v-data-table>
                </div>
            </template>
        </div>
        <!-- Modal de confirmation de suppression -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h6">Voulez-vous vraiment supprimer ce patient ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- Modal d'ajout -->
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
                    Ajouter un patient
                </v-btn>
            </template>
        <v-form v-on:submit.prevent="submitForm">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="editedItem.nom"
                                    label="Nom"
                                    required
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col
                                cols="12"
                                sm="12"
                                md="12"
                            >
                                <v-text-field
                                    v-model="editedItem.prenom"
                                    label="Prénom"
                                    required
                                ></v-text-field>
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
                                            v-model="editedItem.dateFormatted"
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
                    @click="close"
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
// import PatientsServices from '../services/PatientsServices' 

    export default {
        name:"PatientComponent",
        data:function() {
            return {
                patients: [],
                editedItem: {
                    _id:'',
                    nom:'',
                    prenom:'',
                    dateFormatted: null,
                },
                dialog: false,
                dialogDelete:false,
                activePicker: null,
                menu: false,
                date: null,
                search: '',
                editedIndex:-1
            }
        },
        created() {
            this.getAllPatients()
        },
        // si utilisateur non connecté -> redirection vers page d'accueil
        beforeCreate: function() {
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
        computed: {
            headers() {
                return [
                    {
                        text: 'Nom',
                        align: 'start',
                        sortable: true,
                        value: 'nom',
                    },
                    {
                        text: 'Prénom',
                        value: 'prenom',
                    },
                    { text: 'Date Naissance', value: 'dateNaiss' },
                    { text: 'Actions', value: 'actions', sortable: false },
                ]
            },
            formTitle() {
                return this.editedIndex === -1 ? 'Ajouter un patient' : 'Modifier un patient'
            }
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.activePicker = 'YEAR'))
            },
            date(val) {
                this.editedItem.dateFormatted = moment(this.date).format('DD/MM/YYYY')
            }
        },
        methods: {
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
                // edition
                if (this.editedIndex > -1) {
                    await axios.post("http://localhost:8000/patient/edit",{_id:this.editedItem._id,nom:this.editedItem.nom, prenom:this.editedItem.prenom,dateNaiss:this.editedItem.dateFormatted},{headers:{'Content-Type':'application/json'}}).then(async function() {})
                }
                // ajout
                else {
                    await axios.post("http://localhost:8000/patient/create",{nom: this.editedItem.nom, prenom: this.editedItem.prenom, dateNaiss: this.editedItem.dateFormatted},{headers:{'Content-Type':'application/json'}}).then(async function(response) {
                        if (response.data.patient) {
                            var patient = response.data.patient
                            Swal.fire({
                                title:"Action effectuée",
                                text:"Les informations du patient " + patient.nom + " " + patient.prenom + " (né le "+ moment(patient.dateNaiss).format('DD/MM/YYYY') +") ont été ajoutées.",
                                icon:'success',
                                confirmButtonText:'Ok'
                            })
                        }
                    })
                }
                this.getAllPatients()
                this.close()
            },
            filterOnlyCapsText (value, search, item) {
                return value != null &&
                search != null &&
                typeof value === 'string' &&
                value.toString().toLocaleUpperCase().indexOf(search) !== -1
            },
            editItem (item) {
                this.editedIndex = this.patients.indexOf(item)
                this.editedItem = Object.assign({}, item)
                console.log(item)
                this.editedItem.dateFormatted = moment(item.dateNaiss).format('DD/MM/YYYY')
                this.dialog = true
            },
            deleteItem (item) {
                this.editedIndex = this.patients.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialogDelete = true
            },
            async deleteItemConfirm () {
                var deletePatient = this.patients[this.editedIndex]
                await axios.post('http://localhost:8000/patient/deleteById',{_id:deletePatient._id})
                this.getAllPatients() 
                this.closeDelete()
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            closeDelete () {
                this.dialogDelete = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            showConsultation(item) {
                this.$router.push('/patients/consultations/' + item._id)

            } ,
            getAllPatients() {
                axios.post('http://localhost:8000/patient/findAll').then(response => {
                    this.patients = response.data.patients
                })
            },
        },
    }
</script>

<style scoped>
    #main-PatientComponent {
        padding:15px;
    }
</style>