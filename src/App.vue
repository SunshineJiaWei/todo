<template>
    <div id="app">
        <n-layout>
            <n-layout-header>
                <h1>TO-DO</h1>
                <n-button-group>
                    <n-button @click="on1"> 主页 </n-button>
                    <n-button @click="on2"> 归档页 </n-button>
                </n-button-group>
            </n-layout-header>
            <n-layout-content>
                <!-- 指定组件出现位置 -->
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import {
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NGridItem,
    NGrid,
    NH1,
    NButton,
    NButtonGroup
} from "naive-ui";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const router = useRouter()
const store = useStore()
const on1 = ()=>{
    router.push({path:'/'});
}
const on2 = ()=>{
    router.push({path:'/archive'});
}
onMounted(() => {
    let myData = localStorage.getItem("myData")
    let myfinishData = localStorage.getItem("myfinishData")
    if(myData){
        let list = JSON.parse(myData)
        store.commit("updateTasks", list)
    }
    if(myfinishData){
        let finishList = JSON.parse(myfinishData)
        store.commit("updatefinishTasks", finishList)
    }
})
window.onbeforeunload=(evnet) => {
    let list = store.state.list;
    let finishList = store.state.finishList;
    localStorage.setItem("myData", JSON.stringify(list))
    localStorage.setItem("myfinishData", JSON.stringify(finishList))
}
</script>

<style lang="postcss" scoped>
#app {
    background: #f5f5f5;

    & .n-layout-header {
        text-align: center;
        border-bottom: 1px solid #e6e6e6;
    }

    & .n-layout-content {
        margin:  auto;
        padding: 16px;
        max-width: 360px;
        
    }
    & .n-button {
    margin: 10px;
  }
}
</style>
