<template>
  <router-view />
</template>

<style lang="scss">
@import './styles/variables';
@import './styles/breakpoints';

#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--main-text-color);
  background-color: var(--main-bg-color);
}
</style>
