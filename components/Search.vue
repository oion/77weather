<template>
  <fieldset>
    <input
      type="text"
      v-model="city"
      :placeholder="
        isGettingPosition ? 'Location is loading...' : 'Search for a city'
      "
      @keyup.enter="navigateToWeatherDetails"
    />

    <button @click="getCurrentPosition" type="button">
      <svg
        viewBox="0 0 100 100"
        :class="isGettingPosition ? 'is-searching' : ''"
      >
        <path
          d="m45.5078 95.332v-4.6679l-1.4062-.2344c-7.3047-1.1524-13.7696-3.9453-19.5899-8.4766-1.7187-1.3281-5.039-4.6679-6.4453-6.4648-4.5703-5.8594-7.3828-12.3047-8.51562-19.5703l-.21484-1.4258h-4.66797-4.66797v-4.4922-4.4922h4.66797 4.6875l.11719-.918c.99614-7.207 3.98434-14.1992 8.51564-19.9804 1.5625-1.9922 4.7851-5.2149 6.8164-6.7969 5.4687-4.2773 12.1875-7.1484 19.2969-8.26172l1.4062-.21484v-4.66797-4.66797h4.4922 4.4922v4.66797 4.66797l1.4258.23437c13.6132 2.14849 24.8828 10.39059 30.8008 22.55859 1.8164 3.75 3.0273 7.6367 3.7109 11.9727l.2344 1.4062h4.6679 4.668v4.4922 4.4922h-4.668-4.6679l-.2149 1.4258c-1.8554 11.875-8.418 22.0312-18.4765 28.5351-4.5704 2.9492-10.3125 5.0977-16.0547 5.9961l-1.4258.2149v4.6679 4.668h-4.4922-4.4922zm9.2774-13.9062c12.5586-1.8946 22.9882-11.3867 26.0546-23.711.6446-2.6562.879-4.5703.879-7.7148 0-1.6602-.1172-3.7305-.254-4.5898-2.1875-14.043-12.832-24.6875-26.875-26.875-2.0117-.3125-7.1679-.3125-9.1796 0-9.0821 1.4257-16.8555 6.3671-21.8555 13.8867-3.6133 5.4297-5.2735 10.957-5.2735 17.5781 0 3.1445.2344 5.0586.879 7.7148 1.875 7.5782 6.6796 14.3555 13.2421 18.7305 4.6875 3.1055 9.1797 4.6485 15.3516 5.2735 1.1719.1171 5.4883-.0586 7.0313-.293z"
          fill="#000"
        />
        <circle cx="50" cy="50" fill="#010101" r="18" />
      </svg>
    </button>
  </fieldset>
</template>

<script setup lang="ts">
import type { Weather } from "~/types/weather";

import { useRouter } from "vue-router";

const apiKey = useRuntimeConfig().public.openweathermapApiKey;

const router = useRouter();

const city = ref<string>("");

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
  const { data } = await useFetch<any>(
    "https://api.openweathermap.org/geo/1.0/reverse",
    {
      key: `/ReverseCoords/${currentCoords.value.lat}/${currentCoords.value.long}`,
      query: {
        lat: currentCoords.value.lat,
        lon: currentCoords.value.long,
        limit: 0,
        appid: apiKey,
      },
      server: true,
    }
  );

  return `${data.value[0].name}, ${data.value[0].country}` || "";
};

watch(currentCoords, async () => {
  city.value = await getCityName();
});

const navigateToWeatherDetails = () => {
  if (!city.value) {
    return;
  }

  router.push({
    name: "weather-city",
    params: { city: city.value },
  });
};
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

input[type="text"] {
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
