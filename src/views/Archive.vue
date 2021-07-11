<template>
    <n-space vertical>
        <n-list v-if="finishList.length">
            <draggable
                :list="finishList"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
                handle = ".icon_move"
                animation = "200"
            >
                <template #item="{ index, element }">
                    <finish-task-item
                        :taskIndex="index"
                        :task="element"
                        :key="element.id"
                        @back="gobackList(index,element)"
                        />
                </template>
            </draggable>
        </n-list>
        <n-thing v-else> 你怎么啥也没完成 </n-thing>
    </n-space>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import {
    NList,
    NListItem,
    NButton,
    NSpace,
    NThing,
    NModal,
    NInput,
} from "naive-ui";
import FinishTaskItem from "../components/FinishTaskItem.vue";
import draggable from "vuedraggable";
const store  = useStore();
const finishList = computed(()=>store.state.finishList)
const gobackList = (index,task) =>{
    store.commit("backToList",{
        index:index,
        task:task
    })
}
</script>

<style>
.n-thing {
  text-align: center;
}
</style>
