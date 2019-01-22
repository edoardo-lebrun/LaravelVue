<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <div class="row">
                <div class="col-md-8 offset-md-2">
                    <div class="card">
                        <div class="card-header">
                            <h3>Login</h3>
                        </div>
                        <div class="card-body">
                            <div class="alert alert-danger" v-if="errori.length !== 0">
                                <ul class="list-group">
                                    <li class="list-group-item" v-for="(error, i) in errori">
                                        {{i}}: {{error[0]}}
                                    </li>
                                </ul>
                            </div>
                            <form>
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" class="form-control" name="email" v-model="email" />
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" class="form-control" name="password" v-model="password" />
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary" type="submit" @click.prevent.default="makeLogin">
                                        Invia
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                email: '',
                password: '',
                errori: []
            }
        },
        methods:{
            makeLogin(){
                axios.post('login', {user: [this.email, this.password]})
                    .then(response => {
                        router.to('/board')
                    })
                    .catch(errors => {
                        this.errori = errors.response.data.errors
                    })
            }
        }
    }
</script>

<style scoped>

</style>