<template>
  <MainNav>
    <NuxtLink :to="{ name: 'search' }">Back to Search</NuxtLink>
  </MainNav>

  <section>
    <ClientOnly>
      <button
        v-if="weather"
        @click="add(city)"
        :disabled="citySaved"
      >
        {{ citySaved ? 'Location Saved' : 'Save Location' }}
      </button>
    </ClientOnly>

    <WeatherViewer :weather="weather" />
  </section>
</template>

<script setup lang="ts">
import type { Weather } from '~/types/weather';
import useCitiesStore from '~/stores/CitiesStore';

const apiKey = useRuntimeConfig().public.openweathermapApiKey;

const { city } = useRoute().params as { city: string };

const getWeather = async () => {
  const { data: weather, error } = await useFetch<Weather>('https://api.openweathermap.org/data/2.5/weather', {
    key: `/Weather/${city}`,
    query: {
      q: city,
      units: 'metric',
      appid: apiKey,
    },
  });

  if (weather) {
  }

  if (error.value) {
    console.error(error.value);
  }

  return weather;
};

const weather = await getWeather();

const { add, isSaved } = useCitiesStore();

const citySaved = computed(() => isSaved(city as string));
</script>

<style scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
}
button {
  background: #e56300;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 1rem;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  cursor: pointer;
  display: block;
  margin-left: auto;
  margin-right: 0;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
</style>
