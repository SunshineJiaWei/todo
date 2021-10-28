import * as Vuex from "vuex";

const store = Vuex.createStore({
    state() {
        return {
            list: [],
            finishList:[]
        }
    },
    mutations: {
        addTask(state, task) {
            state.list.unshift(task)
        },
        updateTask(state,task) {
            state.list[task.idx] = task.task
        },
        updateTasks(state, tasks) {
            console.log(tasks);
            state.list = tasks
        },
        updatefinishTasks(state, tasks) {
            console.log(tasks);
            state.finishList = tasks
        },
        deleteTask(state, index) {
            state.list.splice(index, 1);
        },
        finishTask(state, task){
            state.finishList.unshift(task.task)
            state.list.splice(task.index, 1)
        },
        backToList(state, task){
            state.list.unshift(task.task)
            state.finishList.splice(task.index, 1)

        }
    }
});

export default store;