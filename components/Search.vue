<template>
  <div>
    <fieldset>
      <input
        v-model="city"
        type="text"
        :placeholder="isGettingPosition ? 'Location is loading...' : 'Search for a city'"
        @keyup="search"
        @keyup.enter="navigateToWeatherDetails"
      />

      <button
        type="button"
        @click="getCurrentPosition"
      >
        <IconSearch :class="isGettingPosition ? 'is-searching' : ''" />
      </button>
    </fieldset>
    <pre>{{ weather }}</pre>
  </div>
</template>

<script setup lang="ts">
import { IconSearch } from './Icons';
import type { Weather } from '~/types/weather';
import { useDebounceFn } from '@vueuse/core';
import { useRouter } from 'vue-router';

const apiKey = useRuntimeConfig().public.openweathermapApiKey;

const router = useRouter();

const city = ref<string>('');

const weather = ref<Weather | null>(null);

const currentCoords = ref<{ lat: number; long: number }>({ lat: 0, long: 0 });

const isGettingPosition = ref<boolean>(false);

const getCurrentPosition = async () => {
  isGettingPosition.value = true;

  navigator.geolocation.getCurrentPosition((position) => {
    currentCoords.value = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    isGettingPosition.value = false;
  });
};

const getCityName = async () => {
  const { data } = await useFetch('https://api.openweathermap.org/geo/1.0/reverse', {
    key: `/ReverseCoords/${currentCoords.value.lat}/${currentCoords.value.long}`,
    query: {
      lat: currentCoords.value.lat,
      lon: currentCoords.value.long,
      limit: 1,
      appid: apiKey,
    },
    server: true,
  });

  return data.value?.[0] ? `${data.value[0].name}, ${data.value[0].country}` : '';
};

watch(currentCoords, async () => {
  city.value = await getCityName();
});

watch(city, () => {
  search();
});

const navigateToWeatherDetails = () => {
  if (!city.value) {
    return;
  }

  router.push({
    name: 'weather-city',
    params: { city: city.value },
  });
};

const getWeather = async () => {
  const { data: weather, error } = await useFetch<Weather>('/api/weather', {
    query: {
      city: city.value,
    },
  });

  if (error.value) {
    console.error(error.value);
  }

  return weather.value;
};

const search = useDebounceFn(async () => {
  weather.value = await getWeather();
}, 2000);
</script>

<style scoped>
fieldset {
  border: none;
  margin: 0;
  padding: 0.5rem;
  display: flex;
  align-items: center;

  background: white;
  border-radius: 0.2rem;
}

input[type='text'] {
  width: 100%;
  font-size: 1rem;
  border: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  padding-left: 1rem;
  border-left: 1px solid #ccc;
}

svg {
  width: 1.5rem;
  height: 1.5rem;
  color: black;
}

svg.is-searching circle {
  animation: pulse 1s linear infinite;
  transform-origin: 50% 50%;
}

@keyframes pulse {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
</style>
