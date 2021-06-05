import axios from 'axios'

class PatientsServices {

    getAllPatients() {
        axios.post('http://localhost:8000/patient/findAll').then(response => {   
            return response.data.patients
        });
    }
}

export default new PatientsServices();