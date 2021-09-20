<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <div :class="styles.id"><Skeleton /></div>
    </div>
    <div :class="styles.name"><Skeleton /></div>
    <div :class="styles.classification"><Skeleton /></div>
    <div :class="styles.types">
      <div :class="styles.type">
        <Skeleton />
      </div>
      <div :class="styles.type">
        <Skeleton />
      </div>
    </div>
    <div :class="styles.favoriteContainer">
      <div :class="styles.notFavorite"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import Skeleton from './Skeleton.vue'

export default defineComponent({
  components: {
    Skeleton,
  },
  setup() {
    const styles = useCssModule()

    return { styles }
  },
})
</script>

<style lang="scss" module>
.container {
  text-align: center;
  width: 18.75rem;
  height: 16rem;
  border-radius: 0.625rem;
  box-shadow: 10px 10px 60px #e9e8e7;
  transition: transform 0.5s ease-in-out;

  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
}

.id {
  margin: 1rem;
  height: 5rem;
}

.name {
  height: 1.5rem;
  margin: 0.2rem 5rem;
}

.classification {
  height: 0.875rem;
  margin-top: 0.3rem;
  margin-left: 5.5rem;
  margin-right: 5.5rem;
}

.types {
  position: relative;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.type {
  height: 1.125rem;
  width: 100%;

  &:first-child {
    margin-left: 3.75rem;
  }

  &:last-child {
    margin-right: 3.75rem;
  }
}

.types * + * {
  margin-left: 1rem;
}

.favorite-container {
  flex: 1 1 auto;
  align-self: flex-end;
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-end;

  & > * {
    flex: 1;
    width: 1.75rem;
    height: 1.75rem;
  }

  .not-favorite {
    background: url('/img/pokeball_bw.svg') no-repeat;
  }
}
</style>
