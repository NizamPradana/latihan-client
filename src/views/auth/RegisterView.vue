<template>

    <div class="container-fluid mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>REGISTER</h4>
                        <hr>
                        <form @submit.prevent="register">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Full Name</label>
                                        <input type="text" v-model="user.name" class="form-control"
                                            placeholder="Full Name">
                                    </div>
                                    <div v-if="validation.name" class="mt-2 alert alert-danger">
                                        {{ validation.name[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Id Card Number</label>
                                        <input type="number" v-model="user.id_card_number" class="form-control"
                                            placeholder="Id Card Number">
                                    </div>
                                    <div v-if="validation.id_card_number" class="mt-2 alert alert-danger">
                                        {{ validation.id_card_number[0] }}
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Born Date</label>
                                        <input type="date" v-model="user.born_date" class="form-control"
                                            placeholder="Born Date">
                                    </div>
                                    <div v-if="validation.born_date" class="mt-2 alert alert-danger">
                                        {{ validation.born_date[0] }}
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Gender</label>
                                        <select id="" v-model="user.gender" class="form-select" required>
                                            <option value=""> - Pilih - </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <div v-if="validation.gender" class="mt-2 alert alert-danger">
                                        {{ validation.gender[0] }}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Role</label>
                                        <select id="" v-model="user.role" class="form-select" required>
                                            <option value=""> - Pilih - </option>
                                            <option value="Society">Society</option>
                                            <option value="Doctor">Doctor</option>
                                        </select>
                                        <div v-if="validation.role" class="mt-2 alert alert-danger">
                                        {{ validation.role[0] }}

                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>Regional</label>
                                        
                                        <input type="number" class="form-control" v-model="user.regional_id">

                                    </div>
                                    <div v-if="validation.regional_id" class="mt-2 alert alert-danger">
                                        {{ validation.regional_id[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="form-group mb-2">
                                <label>Address</label>
                                <textarea  cols="30" rows="5" v-model="user.address" class="form-control"></textarea>
                                <div v-if="validation.address" class="mt-2 alert alert-danger">
                                    {{ validation.address[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">REGISTER</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import {  reactive, ref } from 'vue'
    import { useRouter } from 'vue-router'
    import axios from 'axios'

    export default {


        setup() {

            //inisialisasi vue router on Composition API
            const router = useRouter()

            //state user
            const user = reactive({
                name: '',
                id_card_number: '',
                born_date: '',
                gender: '',
                address: '',
                role: '',
                regional_id: '',
            })

            // let regional = ref([])
            

            // onMounted(() => {

            //     axios.get("http://localhost:8000/api/v1/region").
            //     then(response => {
            //         regional.value = response.data
            //         console.log(regional)
            //     }).catch(error => {
            //         console.log(error.response.data)
            //     })

            // })

            //state validation
            const validation = ref([])

            //method register
            function register() {

                //define variable 
                let name = user.name
                let id_card_number = user.id_card_number
                let born_date = user.born_date
                let gender = user.gender
                let address = user.address
                let role = user.role
                let regional_id = user.regional_id

                //send server with axios
                axios.post('http://localhost:8000/api/v1/auth/register', {
                        name,
                        id_card_number,
                        born_date,
                        gender,
                        address,
                        role,
                        regional_id
                })
                .then(() => {

                    //redirect ke halaman login
                    return router.push({
                        name: 'login'
                    })

                }).catch(error => {
                    //set validation dari error response
                    validation.value = error.response.data
                })

            }

            return {
                user, // <-- state user
                validation, // <-- state validation 
                register, // <-- method register
                // regional
            }

        }

    }
</script>