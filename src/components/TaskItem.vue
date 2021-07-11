<template>
    <n-list-item class="task-item-wrapper">
        <template #prefix>
            <n-icon size="16">
                <drag-indicator-outlined />
            </n-icon>
        </template>
        <swiper
            :initial-slide="1"
            :slides-per-view="1"
            :resistance-ratio="0"
            :speed="200"
            @transitionEnd="onTransitionEnd"
            @tap="onTap"
        >
            <swiper-slide class="finish-slide">完成</swiper-slide>
            <swiper-slide>{{ task.content }}</swiper-slide>
            <swiper-slide class="delete-slide">删除</swiper-slide>
        </swiper>
    </n-list-item>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { NListItem, NIcon } from "naive-ui";
import { DragIndicatorOutlined } from "@vicons/material";

const props = defineProps({
    task: Object,
    taskIndex: Number,
});
const emit = defineEmit(["delete","edit","finish"]);

const onTransitionEnd = (instance) => {
    const { activeIndex } = instance;
    if (activeIndex === 0) {
        emit("finish");
        instance.destroy();
    }
    else if (activeIndex === 2) {
        emit("delete");
        instance.destroy();
    }
};
const onTap = (instance) => {
  emit("edit");
};
</script>

<style lang="postcss">
.task-item-wrapper {
    padding: 0 !important;
    border: 1px solid var(--merged-border-color);
    cursor: move;

    & .n-list-item__prefix {
        margin: 0px !important;
        padding: 8px;
        display: flex;
    }

    & .swiper-container {
        width: 100%;
        height: 100%;
        cursor: default;
    }

    & .swiper-slide {
        padding: 8px 0;
        display: flex;
        align-items: center;
        width: 100% !important;
    }

    & .delete-slide {
        color: white;
        background: tomato;
        padding-left: 16px;
        justify-content: flex-start;
        box-sizing:border-box;
    }
    & .finish-slide {
        color: white;
        background: #0099ff;
        padding-right: 16px;
        justify-content: flex-end;
        box-sizing:border-box;
    }
}

.task-item-wrapper:not(:last-child) {
    border-bottom: none !important;
}
</style>