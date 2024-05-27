<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { ChevronsUpDown, Loader2 } from 'lucide-vue-next';

type Options = {
  label: string;
  value: string;
};

const props = defineProps<{
  options: Array<Options>;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  isLoading?: boolean;
}>();

const isOpenSelect = ref(false);

const inSideRef = ref();

let selectModel = reactive<Options>({
  label: '',
  value: '',
});

const emits = defineEmits(['update:selectModel', 'onChange']);

const handleClick = () => {
  isOpenSelect.value = !isOpenSelect.value;
};

const handleSelect = (values: Options) => {
  selectModel.label = values.label;
  selectModel.value = values.value;
  isOpenSelect.value = false;
  emits('onChange');
};

const handleClickOutside = (event: any) => {
  if (!inSideRef.value.contains(event.target)) {
    isOpenSelect.value = false;
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

watch(selectModel, (values) => {
  emits('update:selectModel', values.value);
});

watch(
  () => props.defaultValue,
  (val) => {
    selectModel.value = val || '';
  },
  { immediate: true }
);

const getLabelFromOption = computed(() => {
  const ans = props.options.find(
    (option) => option.value === selectModel.value
  );
  return ans;
});
</script>

<template>
  <div class="relative w-full" ref="inSideRef">
    <button
      v-on:click="handleClick"
      class="flex items-center justify-between px-3 py-1 border border-gray-300 rounded-md text-xs sm:text-sm w-full"
    >
      <span
        v-if="getLabelFromOption?.label && !props.isLoading"
        class="text-gray-500"
      >
        {{ getLabelFromOption?.label }}
      </span>

      <span v-if="props.isLoading" class="text-gray-500"> ... </span>

      <span
        v-if="
          props.placeholder && !getLabelFromOption?.label && !props.isLoading
        "
        class="text-sm text-gray-400 text-left"
        >{{ placeholder }}</span
      >
      <ChevronsUpDown v-if="!props.isLoading" class="w-4 h-4 text-gray-400" />
      <Loader2
        v-if="props.isLoading"
        class="w-4 h-4 text-gray-400 animate-spin"
      />
    </button>

    <div
      v-if="options.length && isOpenSelect"
      class="absolute top-9 left-0 right-0 bg-white shadow-md border border-gray-300 rounded-md z-10"
    >
      <ul class="flex flex-col space-y-1 my-1 overflow-y-auto max-h-60">
        <template v-for="itemSelect in props.options" :key="itemSelect.id">
          <li
            v-on:click="handleSelect(itemSelect)"
            class="hover:bg-gray-100 transition cursor-pointer text-xs sm:text-sm text-gray-700 px-2"
            :class="selectModel.value === itemSelect.value && 'bg-gray-200'"
          >
            {{ itemSelect.label }}
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
select {
  /* Customize select appearance here */
  appearance: none;
  border: 1px solid #ccc;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: inherit;
}

select:focus {
  outline: 2px solid #007bff;
}
</style>
