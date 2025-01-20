const useCitiesStore = defineStore(
  'citiesStore',
  () => {
    const cities = ref<string[]>([]);

    const add = (city: string) => {
      if (!cities.value.includes(city)) {
        cities.value.push(city);
      }
    };

    // remove City
    const remove = (city: string) => {
      cities.value = cities.value.filter((item) => item !== city);
    };

    const isSaved = (city: string) => cities.value.includes(city);

    return {
      cities,
      isSaved,
      add,
      remove,
    };
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
);

export default useCitiesStore;
