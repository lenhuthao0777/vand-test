<script setup lang="ts">
import Spinner from './spinner.vue';

const props = defineProps<{
  modalActive: boolean;
  isLoading: boolean;
}>();
defineEmits(['close-modal']);
</script>

<template>
  <Transition name="modal-outer">
    <div
      v-show="props.modalActive"
      class="fixed top-0 left-0 bottom-0 w-full flex items-center justify-center bg-black bg-opacity-30"
    >
      <Spinner v-if="props.isLoading" class="bg-black bg-opacity-20 absolute top-0 left-0 bottom-0 w-full h-full" />

      <Transition name="modal-inner" v-if="props.modalActive && !isLoading">
        <div class="bg-white max-w-screen-md rounded-md">
          <slot />
          <div class="flex items-center justify-end p-5 border-t border-gray-300">
            <button
              @click="$emit('close-modal')"
              class="px-2 py-1 bg-rose-600 text-sm text-white rounded-md hover:bg-rose-600/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
