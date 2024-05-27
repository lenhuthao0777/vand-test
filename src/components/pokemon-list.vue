<script setup lang="ts">
import { onMounted, reactive, ref, computed, watch } from 'vue';

import PokemonApi from '../apis/pokemon';
import TypeApi from '../apis/type';
import { Pokemons, PokemonType } from '../types/pokemon.type';
import { removeEmptyValues } from '../utils';

import PokemonCard from './pokemon-card.vue';
import SelectComp from './common/select.vue';
import Spinner from './common/spinner.vue';
import Pagination from './pagination.vue';

type QueryStringParameter = {
  'page[size]': number;
  'page[number]': number;
  sort?: string;
  'filter[type]'?: string;
};

const pokemonResponse = ref<Pokemons>();

const queryStringParameter = reactive<QueryStringParameter>({
  'page[size]': 10,
  'page[number]': 1,
  sort: 'number',
  'filter[type]': '',
});
const types = ref<Array<PokemonType>>();

const isLoading = ref(true);

const isLoadingType = ref(true);

const getPokemons = async () => {
  isLoading.value = true;
  try {
    const searchParams = new URLSearchParams(
      removeEmptyValues(queryStringParameter)
    ).toString();
    const res = await PokemonApi.index<Pokemons>(decodeURI(searchParams));
    pokemonResponse.value = res.payload;
    const totalPage = Math.ceil(
      res.payload.meta.total / queryStringParameter['page[size]']
    );
    if (totalPage < queryStringParameter['page[number]']) {
      queryStringParameter['page[number]'] = 1;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const getPokemonType = async () => {
  isLoadingType.value = true;
  try {
    const res = await TypeApi.getType<PokemonType>();
    types.value = res?.data;
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingType.value = false;
  }
};

onMounted(() => {
  getPokemonType();
});

const typesSelect = computed(() => {
  return types.value?.length
    ? [
        ...[{ label: 'All', value: '' }],
        ...types.value.map((item: PokemonType) => ({
          label: item.name,
          value: String(item.id),
        })),
      ]
    : [];
});

const sortSelect = [
  {
    label: 'Number ascending',
    value: 'number',
  },
  {
    label: 'Total ascending',
    value: 'total',
  },
  {
    label: 'Hp ascending',
    value: 'hp',
  },
  {
    label: 'Attack ascending',
    value: 'attack',
  },
  {
    label: 'Defense ascending',
    value: 'defense',
  },
  {
    label: 'Speed ascending',
    value: 'speed',
  },
  {
    label: 'Speed Attack ascending',
    value: 'sp_atk',
  },
  {
    label: 'Speed Defense ascending',
    value: 'sp_def',
  },
  //
  {
    label: 'Number decrease',
    value: '-number',
  },
  {
    label: 'Total decrease',
    value: '-total',
  },
  {
    label: 'Hp decrease',
    value: '-hp',
  },
  {
    label: 'Attack decrease',
    value: '-attack',
  },
  {
    label: 'Defense decrease',
    value: '-defense',
  },
  {
    label: 'Speed decrease',
    value: '-speed',
  },
  {
    label: 'Speed Attack decrease',
    value: '-sp_atk',
  },
  {
    label: 'Speed Defense decrease',
    value: '-sp_def',
  },
];

watch(
  queryStringParameter,
  () => {
    getPokemons();
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <section class="mx-4 sm:mx-10 md:mx-20 my-10">
    <div class="mb-5">
      <div class="w-full flex items-center justify-end space-x-5 mt-5">
        <div class="w-72 flex items-center space-x-2">
          <label class="text-xs sm:text-sm text-gray-500">Type</label>
          <SelectComp
            :options="typesSelect"
            :placeholder="'Select type'"
            :default-value="queryStringParameter['filter[type]']"
            :is-loading="isLoadingType"
            v-model:select-model="queryStringParameter['filter[type]']"
          />
        </div>

        <div class="w-72 flex items-center space-x-2">
          <label class="text-xs sm:text-sm text-gray-500">Sort</label>
          <SelectComp
            :options="sortSelect"
            :placeholder="'Select sort'"
            :default-value="queryStringParameter.sort"
            v-model:select-model="queryStringParameter.sort"
          />
        </div>
      </div>
    </div>

    <ul
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 relative"
      v-if="pokemonResponse?.data.length"
    >
      <template v-for="pokemon in pokemonResponse?.data" :key="pokemon.id">
        <PokemonCard :poke="pokemon" />
      </template>

      <Spinner v-if="isLoading" class="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-10 w-full h-full rounded-md" />
    </ul>

    <Pagination
      :total="pokemonResponse?.meta.total"
      :page-size="queryStringParameter['page[size]']"
      v-model:page-number="queryStringParameter['page[number]']"
    />
  </section>
</template>
