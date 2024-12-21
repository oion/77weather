<template>
  <div class="container">
    <Search />

    <ClientOnly>
      <CityList fallback="Loading cities..." />
    </ClientOnly>
  </div>
</template>

<style scoped>
.container {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
}
</style>
