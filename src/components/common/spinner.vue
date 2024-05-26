<script setup lang="ts">
import spinner from '../../assets/pokeball.svg';
</script>

<template>
  <div class="w-full h-96 flex items-center justify-center">
    <div
      class="flex items-center justify-center"
    >
      <img :src="spinner" class="w-8 h-8 rounded-full bg-rose-500 animate-spin" alt="spin" />
    </div>
  </div>
</template>
