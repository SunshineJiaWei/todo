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
        >
            <swiper-slide class="back-start-slide">撤回</swiper-slide>
            <swiper-slide>{{ task.content }}</swiper-slide>
            <swiper-slide class="back-end-slide">撤回</swiper-slide>
        </swiper>
    </n-list-item>
</template>
<script setup>
import { defineProps, defineEmit, ref } from "vue";
import "swiper/swiper.min.css";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DragIndicatorOutlined } from "@vicons/material";
import { NListItem, NIcon } from "naive-ui";
const props = defineProps({
  taskIndex: Number,
  task: Object,
});
const emit = defineEmit("[back]")

const onTransitionEnd = (instance) => {
  const {activeIndex} = instance;
  if (activeIndex === 0 || activeIndex ===2){
    emit("back")
    instance.destroy();
  }
}

</script>
<style lang="postcss">
.task-item-wrapper {
    padding: 0 !important;
    border: 1px solid var(--merged-border-color);
    cursor: move;

  & .back-start-slide {
    color: white;
    background: #0099ff;
    padding-right: 16px;
    justify-content: flex-end;
    box-sizing:border-box;
  }
  & .back-end-slide {
    color: white;
    background: #0099ff;
    padding-left: 16px;
    justify-content: flex-start;
    box-sizing:border-box;
  }
}
  

</style>