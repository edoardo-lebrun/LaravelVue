<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header text-center">
                        To Do List
                    </div>
                    <div class="card-deck" style="padding: 15px 0 15px 0;">
                        <div :class="setColumns(category)" v-for="(category, index) in categories" :key="category.id">
                            <div class="card">
                                <div class="card-header text-center">
                                    <div class="row">
                                        <div class="col-md-10 col-lg-10">
                                            {{category.name}}
                                        </div>
                                        <div class="col-md-2 col-lg-2 ml-auto">
                                            <i class="fa fa-plus-square" data-toggle="tooltip" data-placement="top" title="Aggiungi una nuova nota" v-if="category.id === 1" style="color: gray;cursor: pointer;"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <ul class="list-group">
                                        <draggable :options="{group:'description', animation: 1}" @end="changeOrder" :key="category.id" v-model="category.tasks">
                                            <transition-group :id="category.id">
                                                <li class="list-group-item transit-1" v-for="(task, index) in orderedTasks(category.tasks)" :task="task" :key="task.id" :id="task.id">
                                                    {{task.order+1}} {{task.name}}
                                                </li>
                                            </transition-group>
                                        </draggable>
                                    </ul>
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
    import Draggable from 'vuedraggable';

    export default {
        data(){
            return {
                categories: [],
            }
        },
        components:{
          draggable: Draggable
        },
        created(){
          this.loadCategories();
        },
        methods:{
            orderedTasks: function (tasks) {
                return _.orderBy(tasks, 'task.order')
            },
            loadCategories(){
                axios.get('api/category')
                    .then(response => {
                        response.data.forEach((data) => {
                            this.categories.push({
                                id: data.id,
                                name: data.name,
                                tasks:[]
                            });
                        });
                        this.loadTasks();
                        console.log('Categoria con tasks' ,this.categories)
                    })
            },
            loadTasks(){
                this.categories.map(category => {
                    axios.get('api/category/'+category.id+'/tasks')
                        .then(response =>{
                            category.tasks = response.data
                        })
                });
                this.$nextTick(function () {
                    $('[data-toggle="tooltip"]').tooltip()
                })
            },
            setColumns(category){
                if(category.id === 2){
                    return 'col-md-6'
                }
                return 'col-md-3'
            },
            changeOrder(data){
                let toTask = data.to;
                let fromTask = data.from;
                let task_id = data.item.id;
                let category_id = fromTask.id === toTask.id ? fromTask.id : toTask.id;
                let order = data.newIndex === data.oldIndex ? false : data.newIndex;

                console.log('New '+data.newIndex, 'Old '+data.oldIndex);
                console.log('toTaskID '+toTask.id, 'Order: '+order, 'CategoryID '+category_id, 'TaskID '+task_id);

                if (order !== false) {
                    axios.patch('api/task/'+task_id, {order, category_id}).then(response => {

                    });
                } else {
                    axios.patch('api/task/'+task_id, {order: data.oldIndex, category_id}).then(response => {

                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>