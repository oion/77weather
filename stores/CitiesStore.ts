const useCitiesStore = defineStore(
  'citiesStore',
  () => {
    const cities = ref<string[]>([]);

    const addCity = (city: string) => {
      if (!cities.value.includes(city)) {
        cities.value.push(city);
      }
    };

    const removeCity = (city: string) => {
      cities.value = cities.value.filter((item) => item !== city);
    };

    const isSaved = (city: string) => cities.value.includes(city);

    return {
      cities,
      isSaved,
      addCity,
      removeCity,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);

export default useCitiesStore;
