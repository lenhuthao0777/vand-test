<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import Modal from './common/modal.vue';
import Type from './type.vue';

import pokemonbox from '../assets/pokemonbox.svg';
import { getColor } from '../utils';
import PokemonApi from '../apis/pokemon';
import { Pokemon, PokeType } from '../types/pokemon.type';

const props = defineProps<{
  pokemon: Pokemon;
}>();

defineEmits(['close-modal']);

const pokemonDetail = ref<PokeType>();
const isLoading = ref(false);

const color = getColor(String(props.pokemon.type_1));

const modalActive = inject<boolean>('modalActive');

const getPokemon = async () => {
  isLoading.value = true;
  try {
    const res = await PokemonApi.show<PokeType>(String(props.pokemon.number));
    pokemonDetail.value = res;
    console.log(res);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const spriteDownload = async (id?: string, name?: string) => {
  const res = await fetch(
    `https://api.vandvietnam.com/api/pokemon-api/pokemons/${id}/sprite`,
    { method: 'GET' }
  );

  const blob = await res.blob();

  const blobUrl = URL.createObjectURL(blob);

  console.log(blobUrl);

  const link = document.createElement('a');

  link.href = blobUrl;

  name && (link.download = name);

  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  );

  URL.revokeObjectURL(link as any);

  document.body.removeChild(link);
};

onMounted(() => {
  getPokemon();
});
</script>

<template>
  <Modal :modal-active="!!modalActive" :is-loading="isLoading">
    <div
      v-if="!isLoading"
      class="rounded-t-md relative max-w-96 w-80 sm:w-96"
      :style="{
        backgroundColor: color,
      }"
    >
      <span class="text-sm font-semibold absolute top-2 right-2"
        >#{{ props.pokemon.number }}</span
      >
      <img
        :src="pokemonDetail?.sprites?.front_default"
        alt="img"
        class="w-40 h-40 mx-auto"
      />
      <div class="bg-white p-5">
        <p class="text-md font-semibold text-center">About</p>
        <table class="mt-5">
          <tbody class="flex flex-col space-y-3">
            <tr>
              <th class="w-40 text-sm font-extrabold">Name:</th>
              <td class="font-semibold" :style="{ color: color }">
                {{ props.pokemon.name }}
              </td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Type:</th>
              <td>
                <Type :type="[props.pokemon?.type_1, props.pokemon?.type_2]" />
              </td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Total:</th>
              <td class="font-semibold">{{ props.pokemon.total }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Hp:</th>
              <td class="font-semibold">{{ props.pokemon.hp }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Attack:</th>
              <td class="font-semibold">{{ props.pokemon.attack }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Defense:</th>
              <td class="font-semibold">{{ props.pokemon.defense }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Speed:</th>
              <td class="font-semibold">{{ props.pokemon.speed }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Speed Attack:</th>
              <td class="font-semibold">{{ props.pokemon.sp_atk }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Speed Defense:</th>
              <td class="font-semibold">{{ props.pokemon.sp_def }}</td>
            </tr>
            <tr>
              <th class="w-40 text-sm font-extrabold">Image:</th>
              <td
                class="font-semibold underline hover:text-blue-500 transition"
                @click="spriteDownload(props.pokemon.id, props.pokemon.name)"
              >
                Download
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <img
        :src="pokemonbox"
        alt="pokemon-box"
        class="absolute z-[1] right-2 top-2 opacity-10"
      />
    </div>
  </Modal>
</template>

<style scoped></style>
