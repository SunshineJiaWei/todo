<template>
    <n-space vertical>
        <n-list v-if="list.length">
            <draggable
                :list="list"
                @change="dragList"
                @start="drag = true"
                @end="drag = false"
                item-key="id"
            >
                <template #item="{ index, element }">
                    <task-item
                        :taskIndex="index"
                        :task="element"
                        :key="element.id"
                        @delete="() => onDelete(index)"
                        @edit="() => onEdit(index, element)"
                        @finish="() => onFinish(index, element)"
                    />
                </template>
            </draggable>
        </n-list>
        <n-thing v-else> 请添加待办任务 </n-thing>
        <div class="extra">
            <n-button @click="showModal = true"> 添加 </n-button>
        </div>
    </n-space>

    <n-modal
        v-model:show="showModal"
        preset="dialog"
        title="Dialog"
        :show-icon="false"
    >
        <template #header>
            <div>添加任务</div>
        </template>
        <div>
            <n-input
                v-model:value="content"
                type="input"
                placeholder="请填写任务信息..."
            />
        </div>

        <template #action>
            <n-button @click="onAdd">添加</n-button>
        </template>
    </n-modal>

    <n-modal
        v-model:show="showEditModal"
        preset="dialog"
        title="Dialog"
        :show-icon="false"
    >
        <template #header>
            <div>修改任务</div>
        </template>
        <div>
            <n-input
                v-model:value="editContent"
                type="input"
                placeholder="请填写任务信息..."
            />
        </div>

        <template #action>
            <n-button @click="onUpdate">提交</n-button>
        </template>
    </n-modal>
</template>

<script setup>
import { computed, ref } from "vue";
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
import TaskItem from "../components/TaskItem.vue";
import draggable from "vuedraggable";
import { cloneDeep } from "lodash";

const initTask = {
    id:"",
    content: "",
    // status: "INCOMPLETE",
};

const store = useStore();
const list = computed(() => store.state.list);

let showModal = ref(false);
let showEditModal = ref(false);
let content = ref(initTask.content);
let editContent = ref("");
let editTaskIndex = ref(0);

const dragList = (e) => {
    const { moved } = e;
    const { oldIndex, newIndex } = moved;
    const tasks = cloneDeep(list);
    tasks.splice(oldIndex, newIndex, tasks[oldIndex]);
    store.commit("updateTasks", tasks);
};

const onAdd = () => {
    store.commit("addTask", {
        ...initTask,
        id : new Date(),
        content : content.value,
    });
    showModal.value = false;
    content.value = "";
};
const onEdit = (index, task) => {
    showEditModal.value = true;
    editTaskIndex.value = index;
    editContent.value = task.content;
};
const onUpdate = () => {
  let task = {
    ...initTask,
    content: editContent.value,
  };
  store.commit("updateTask", {
    idx: editTaskIndex.value,
    task: task,
  });
  showEditModal.value = false;
};
const onDelete = (index) => {
    store.commit("deleteTask", index);
};
const onFinish = (index,task) => {
    store.commit("finishTask",{
        index:index,
        task:task
    })
};
</script>

<style scoped>
.n-thing {
    text-align: center;
}

.extra {
    display: flex;
    justify-content: center;
}
</style>
