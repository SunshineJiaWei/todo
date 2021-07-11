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
                <router-view />
            </n-layout-content>
        </n-layout>
    </div>
</template>

<script setup>
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
const router = useRouter()
const on1 = ()=>{
    router.push({path:'/'});
}
const on2 = ()=>{
    router.push({path:'/archive'});
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
