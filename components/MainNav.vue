<template>
  <nav class="main-nav">
    <slot />
  </nav>
</template>

<style lang="scss">
.main-nav {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    color: white;
    text-decoration: none;
    padding: 0.5rem;
  }
}
</style>
