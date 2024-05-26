<script setup lang="ts">
import { provide, ref } from 'vue';
import { Pokemon } from '../types/pokemon.type';
import { getColor } from '../utils';

import PokemonShow from './pokemon-show.vue';
import Type from './type.vue';

const props = defineProps<{ poke: Pokemon }>();

const modalActive = ref(false);

provide('modalActive', modalActive);

const color = getColor(String(props.poke.type_1));

const handleShowModal = () => {
  modalActive.value = !modalActive.value;
};
</script>

<template>
  <li
    :style="{
      boxShadow: `0 2px 2px ${color}`,
    }"
    @click="handleShowModal"
    class="md:max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer bg-white"
  >
    <p class="text-sm font-semibold text-right">#{{ props.poke.number }}</p>
    <h2
      :style="{
        color: color,
      }"
      class="mb-2 text-xl font-bold tracking-tight text-center"
    >
      {{ props.poke.name }}
    </h2>
    <div class="font-normal text-gray-700 dark:text-gray-400 mt-5">
      <Type :type="[props.poke?.type_1, props.poke?.type_2]" />
    </div>
    <PokemonShow
      v-if="modalActive"
      @close-modal="handleShowModal"
      :pokemon="props.poke"
    />
  </li>
</template>
