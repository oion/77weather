<template>
  <section class="weather-viewer">
    <div v-if="weather">
      <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>

      <span>{{ formatDate(weather.dt) }}</span>

      <div class="info">
        <div class="primary">
          <img v-if="icon" :src="icon" :alt="weather.weather[0].description" />
          <p>
            <span>{{ weather.main.temp }}°</span>
            <span>{{ weather.weather[0].description }}</span>
          </p>
        </div>

        <div class="secondary">
          <div class="info-box">
            <h3>Feels Like</h3>
            <p>{{ Math.round(weather.main.feels_like) }}°C</p>
          </div>

          <div class="info-box">
            <h3>Min Temp</h3>
            <p>{{ Math.round(weather.main.temp_min) }}°C</p>
          </div>

          <div class="info-box">
            <h3>Max Temp</h3>
            <p>{{ Math.round(weather.main.temp_max) }}°C</p>
          </div>

          <div class="info-box">
            <h3>Humidity</h3>
            <p>{{ Math.round(weather.main.humidity) }}%</p>
          </div>
        </div>
      </div>

      <!-- <pre>{{ weather }}</pre> -->
    </div>
    <div v-else class="no-data">No weather data available</div>
  </section>
</template>

<script setup lang="ts">
import type { Weather } from "~/types/weather";

const props = defineProps<{
  weather: Weather | null;
}>();

const icon = computed(() => {
  return props.weather
    ? `http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`
    : null;
});
</script>

<style scoped>
.weather-viewer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.info {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.primary {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-basis: 50%;

  p {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    span {
      &:nth-child(1) {
        font-size: 3rem;
        font-weight: 300;
      }
      &:nth-child(2) {
        font-size: 1rem;
      }
    }
  }
}
.secondary {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
  border-left: 1px solid rgba(255, 255, 255, 0.5);
}
.info-box {
  flex-grow: 1;
  flex-basis: calc(50% - 1.5rem);
  display: flex;
  align-items: center;
  flex-direction: column;

  h3 {
    margin: 0;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 300;
  }
  p {
    font-size: 3rem;
    margin: 0;
    font-weight: 300;
    order: -1;
  }
}
</style>
