<template>
    <div class="col-md-6">
        <button class="btn btn-outline-danger" @click="deleteTask($event, id)">Elimina Task</button>
    </div>
</template>

<script>
    export default {
        props: ['id'],
        data(){
          return{
              nome: ''
          }
        },
        methods: {
            createCategory(){
                axios.post('/api/category/', {name: this.nome});
                console.log('Categoria Creata')
            },
            deleteTask(event, id){
                console.log('questo è l\'id...'+id);
                this.$on('deleteAnTask', id);
                axios.delete('/api/task/'+id);
                console.log('task eliminato')
                this.$emit('deleted')
            }
        }
    }
</script>

<style scoped>

</style>