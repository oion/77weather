<template>
  <div
    v-if="cities.length > 0"
    class="container"
  >
    <h3>Saved Cities</h3>

    <nav>
      <ul>
        <li
          v-for="city in cities"
          :key="city"
        >
          <NuxtLink :to="{ name: 'weather-city', params: { city } }">
            {{ city }}
          </NuxtLink>

          <button @click="remove(city)">
            <IconClose />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { IconClose } from './Icons';
import { storeToRefs } from 'pinia';
import useCitiesStore from '~/stores/CitiesStore';

const citiesStore = useCitiesStore();

const { cities } = storeToRefs(citiesStore);

const { remove } = citiesStore;
</script>

<style scoped type="scss">
ul {
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
  display: flex;
  align-items: center;
}
a {
  color: white;
  display: block;
  background: rgba(0, 0, 0, 0.2);
  text-decoration: none;
  padding: 1rem;
  border-radius: 0.2rem;
  line-height: 1;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}
button {
  background: none;
  border: none;
  cursor: pointer;
}
svg {
  width: 1rem;
  height: 1rem;
  color: white;
}
</style>
