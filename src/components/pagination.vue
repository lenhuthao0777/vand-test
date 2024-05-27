<script setup lang="ts">
import { computed } from 'vue';
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
const props = withDefaults(
  defineProps<{
    pageNumber: number;
    pageSize: number;
    total: number;
  }>(),
  {
    pageNumber: 1,
    pageSize: 10,
    total: 20,
  }
);

const emits = defineEmits(['update:pageNumber', 'onChange']);

const totalPage = computed(() => {
  const ans = Math.ceil(props.total / props.pageSize);
  return ans;
});

const pages = computed(() => {
  const ans: Array<number | string> = [];
  for (let i = 1; i <= totalPage.value; i++) {
    if (
      i === 1 ||
      i === totalPage.value ||
      (i <= props.pageNumber + 2 && i >= props.pageNumber - 2)
    ) {
      ans.push(i);
    }

    if (i === props.pageNumber + 3 || i === props.pageNumber - 3) {
      ans.push('...');
    }
  }
  return ans;
});

const handleChange = (action: string, value?: number | string) => {
  if (action === 'prev') {
    value = props.pageNumber - 1;
  }

  if (action === 'next') {
    value = props.pageNumber + 1;
  } else {
    value = value;
  }

  emits('update:pageNumber', value);
  emits('onChange');
};
</script>

<template>
  <ul class="flex items-center justify-end space-x-4 mt-5">
    <li>
      <button
        @click="handleChange('prev')"
        class="disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md hover:bg-gray-300 flex items-center justify-center w-8 h-8 text-xs sm:w-10 sm:h-10 md:w-12 md:h-12 md:text-sm"
        :disabled="props.pageNumber === 1"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
    </li>
    <template v-for="page in pages" :key="page">
      <li
        v-if="page !== '...'"
        @click="handleChange('page', page)"
        class="border font-semibold rounded-md transition hover:border-rose-500 cursor-pointer flex items-center justify-center w-8 h-8 text-xs sm:w-10 sm:h-10 md:w-12 md:h-12 md:text-sm"
        :class="{
          'border-rose-500 text-rose-500': props.pageNumber === page,
        }"
      >
        {{ page }}
      </li>

      <li v-else class="px-2 py-1">
        {{ page }}
      </li>
    </template>
    <li>
      <button
        @click="handleChange('next')"
        class="disabled:bg-gray-500 disabled:cursor-not-allowed px-2 py-1 rounded-md hover:bg-gray-300 flex items-center justify-center w-8 h-8 text-xs sm:w-10 sm:h-10 md:w-12 md:h-12 md:text-sm"
        :disabled="props.pageNumber == totalPage"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </li>
  </ul>
</template>
