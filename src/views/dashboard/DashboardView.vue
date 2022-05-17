<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        MAIN MENU
                        <hr>
                        <ul class="list-group">
                            <router-link :to="{name: 'dashboard'}"
                                class="list-group-item text-dark text-decoration-none">DASHBOARD</router-link>
                            <li @click.prevent="logout" class="list-group-item text-dark text-decoration-none"
                                style="cursor:pointer">LOGOUT</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="card">
                    <div class="card-body">
                        DASHBOARD
                        <hr>
                        Selamat Datang <strong>{{ user.name }}</strong>
                        <hr>

                        <div class="row">
                            <div class="col-md-5">
                                <div class="card">
                                    <div class="card-header bg-secondary text-light">
                                        My Consultation
                                    </div>
                                    <div class="card-body">
                                        <ul class="list-group" v-if="user.consultation_status == 0">
                                            <li class="list-group-item" >
                                                <a href="" style="text-decoration: none;" data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ consultation</a>

                                                <!-- Modal -->
                                                <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                <div class="modal-dialog">
                                                    <div class="modal-content">
                                                        <div class="modal-header bg-dark text-light">
                                                            <h5 class="modal-title " id="staticBackdropLabel">Consultation</h5>
                                                            <button type="button" class="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <form @submit.prevent="addConsultation">
                                                                <div class="form-group">
                                                                    <label for="">Disease History</label>
                                                                    <input class="form-control" type="text" v-model="addConsul.disease_history" required placeholder="Disease History">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label for="">Current Symptoms</label>
                                                                    <input class="form-control" type="text" v-model="addConsul.current_symptoms" required placeholder="Current Symptoms">
                                                                </div>

                                                                <input type="submit" value="Submit" class="btn btn-primary my-2">

                                                            </form>
                                                        </div>
                                                        
                                                    </div>
                                                </div>
                                                </div>

                                            </li>
                                        </ul>
                                        <ul class="list-group" v-else-if="user.consultation_status > 0">
                                            <li class="list-group-item">
                                                <table class="table table-borderless table-sm m-0">
                                                    <tr>
                                                        <td>Status</td>
                                                        <td>:</td>
                                                        <td>{{ consultations.status}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Disease History</td>
                                                        <td>:</td>
                                                        <td>{{ consultations.disease_history}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Current Symptoms</td>
                                                        <td>:</td>
                                                        <td>{{ consultations.current_symptoms}}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Doctor Name</td>
                                                        <td>:</td>
                                                        <td> {{ consultations.doctor}} </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Doctor Notes</td>
                                                        <td>:</td>
                                                        <td> {{ consultations.doctor_notes}} </td>
                                                    </tr>
                                                </table>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row my-4">
                            <div class="col-md-5">
                                <div class="card">
                                    <div class="card-header bg-secondary text-light">
                                        My Vaccinations
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

    export default {

        setup() {

            //state token
            const token = localStorage.getItem('token')
            const id_user = localStorage.getItem('id_user')

            //inisialisasi vue router on Composition API
            const router = useRouter()
            // const route = useRoute()

            //state user
            const user = ref('')

            const addConsul = reactive({
                disease_history: '',
                current_symptoms: '',
            }) 

            const consultations = ref('')
            
            //mounted properti
            onMounted(() =>{

                //check Token exist
                if(!token) {
                    return router.push({
                        name: 'login'
                    })
                }
                
                //get data user
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.get('http://localhost:8000/api/v1/user')
                .then(response => {

                    // console.log(response.data)
                    user.value = response.data

                })
                .catch(error => {
                    console.log(error.response.data)
                })

                console.log(id_user)

                axios.get(`http://localhost:8000/api/v1/consultation/${id_user}`)
                .then(response => {
                    console.log(response.data)
                    consultations.value = response.data.consultation_data

                })
                .catch(error => {
                    console.log(error.response.data)
                })


            })



            function addConsultation() {

                let disease_history = addConsul.disease_history;
                let current_symptoms = addConsul.current_symptoms;

                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('http://localhost:8000/api/v1/consultation', {
                    disease_history,
                    current_symptoms
                }).
                then(response => {
                    console.log(response.data)
                    alert(response.data.message)
                    location.reload();
                    
                }).catch(error => {
                    console.log(error.response.data)
                })


            }

            //method logout
            function logout() {

                //logout
                axios.defaults.headers.common.Authorization = `Bearer ${token}`
                axios.post('http://localhost:8000/api/v1/auth/logout')
                .then(response => {

                    if(response.data.success) {

                        //remove localStorage
                        localStorage.removeItem('token')
                        localStorage.removeItem('id_user')

                        //redirect ke halaman login
                        return router.push({
                            name: 'login'
                        })

                    }

                })
                .catch(error => {
                    console.log(error.response.data)

                    

                })

            }

            return {
                id_user,
                token,      // <-- state token
                user,       // <-- state user
                logout ,     // <-- method logout
                consultations,
                addConsul,
                addConsultation
            }

        }

    }
</script>