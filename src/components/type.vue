<script setup lang="ts">
import normal from '../assets/types/normal.svg';
import fire from '../assets/types/fire.svg';
import water from '../assets/types/water.svg';
import grass from '../assets/types/grass.svg';
import electric from '../assets/types/electric.svg';
import ice from '../assets/types/ice.svg';
import fighting from '../assets/types/fighting.svg';
import poison from '../assets/types/poison.svg';
import ground from '../assets/types/ground.svg';
import flying from '../assets/types/flying.svg';
import psychic from '../assets/types/psychic.svg';
import bug from '../assets/types/bug.svg';
import rock from '../assets/types/rock.svg';
import ghost from '../assets/types/ghost.svg';
import dark from '../assets/types/dark.svg';
import dragon from '../assets/types/dragon.svg';
import steel from '../assets/types/steel.svg';
import fairy from '../assets/types/fairy.svg';

defineProps<{ type: Array<number> }>();

const types = [
  {
    id: 0,
    type: 0,
    color: '',
    img: normal,
    name: 'Normal',
  },
  {
    id: 1,
    type: 1,
    color: '',
    img: fire,
    name: 'Fire',
  },
  {
    id: 2,
    type: 2,
    color: '',
    img: water,
    name: 'Water',
  },
  {
    id: 3,
    type: 3,
    color: '',
    img: grass,
    name: 'Grass',
  },
  {
    id: 4,
    type: 4,
    color: '',
    img: electric,
    name: 'Electric',
  },
  {
    id: 5,
    type: 5,
    color: '',
    img: ice,
    name: 'Ice',
  },
  {
    id: 6,
    type: 6,
    color: '',
    img: fighting,
    name: 'Fighting',
  },
  {
    id: 7,
    type: 7,
    color: '',
    img: poison,
    name: 'Poison',
  },
  {
    id: 8,
    type: 8,
    color: '',
    img: ground,
    name: 'Ground',
  },
  {
    id: 9,
    type: 9,
    color: '',
    img: flying,
    name: 'Flying',
  },
  {
    id: 10,
    type: 10,
    color: '',
    img: psychic,
    name: 'Psychic',
  },
  {
    id: 11,
    type: 11,
    color: '',
    img: bug,
    name: 'Bug',
  },
  {
    id: 12,
    type: 12,
    color: '',
    img: rock,
    name: 'Rock',
  },
  {
    id: 13,
    type: 13,
    color: '',
    img: ghost,
    name: 'Ghost',
  },
  {
    id: 14,
    type: 14,
    color: '',
    img: dark,
    name: 'Dark',
  },
  {
    id: 15,
    type: 15,
    color: '',
    img: dragon,
    name: 'Dragon',
  },
  {
    id: 16,
    type: 16,
    color: '',
    img: steel,
    name: 'Steel',
  },
  {
    id: 17,
    type: 17,
    color: '',
    img: fairy,
    name: 'Fairy',
  },
];
</script>

<template>
  <div class="flex items-center justify-end space-x-2">
    <template v-for="typePoke in types" :key="typePoke.id">
      <div
        v-if="type.includes(typePoke.type)"
        :class="`${typePoke.name.toLowerCase()} flex items-center justify-center w-7 h-7 rounded-full`"
      >
        <img
          :src="typePoke.img"
          :alt="typePoke?.name + 'img'"
          class="w-5 h-5 bg-center object-fill"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.bug {
  background: #92bc2c;
  box-shadow: 0 0 20px #92bc2c;
}

.dark {
  background: #595761;
  box-shadow: 0 0 20px #595761;
}

.dragon {
  background: #0c69c8;
  box-shadow: 0 0 20px #0c69c8;
}

.electric {
  background: #f2d94e;
  box-shadow: 0 0 20px #f2d94e;
}

.fire {
  background: #fba54c;
  box-shadow: 0 0 20px #fba54c;
}

.fairy {
  background: #ee90e6;
  box-shadow: 0 0 20px #ee90e6;
}

.fighting {
  background: #d3425f;
  box-shadow: 0 0 20px #d3425f;
}

.flying {
  background: #a1bbec;
  box-shadow: 0 0 20px #a1bbec;
}

.ghost {
  background: #5f6dbc;
  box-shadow: 0 0 20px #5f6dbc;
}

.grass {
  background: #5fbd58;
  box-shadow: 0 0 20px #5fbd58;
}

.ground {
  background: #da7c4d;
  box-shadow: 0 0 20px #da7c4d;
}

.ice {
  background: #75d0c1;
  box-shadow: 0 0 20px #75d0c1;
}

.normal {
  background: #a0a29f;
  box-shadow: 0 0 20px #a0a29f;
}

.poison {
  background: #b763cf;
  box-shadow: 0 0 20px #b763cf;
}

.psychic {
  background: #fa8581;
  box-shadow: 0 0 20px #fa8581;
}

.rock {
  background: #c9bb8a;
  box-shadow: 0 0 20px #c9bb8a;
}

.steel {
  background: #5695a3;
  box-shadow: 0 0 20px #5695a3;
}

.water {
  background: #539ddf;
  box-shadow: 0 0 20px #539ddf;
}
</style>
