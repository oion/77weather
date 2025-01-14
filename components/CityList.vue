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
            <svg
              viewBox="0 0 24 24"
              fill="none"
            >
              <g
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="currentColor"
              >
                <line
                  x1="18"
                  y1="6"
                  x2="6"
                  y2="18"
                ></line>
                <line
                  x1="6"
                  y1="6"
                  x2="18"
                  y2="18"
                ></line>
              </g>
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useCitiesStore from '~/stores/CitiesStore';

const citiesStore = useCitiesStore();
const { cities } = storeToRefs(citiesStore);
const { removeCity } = citiesStore;

const remove = (city: string) => {
  removeCity(city);
};
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
