<template>
  <div :class="styles.container">
    <div :class="styles['name-classification-fav-container']">
      <div :class="styles.name"><Skeleton /></div>
      <div :class="styles.classification"><Skeleton /></div>
      <div :class="styles['favorite-container']">
        <div :class="styles['not-favorite']"></div>
      </div>
    </div>

    <div :class="styles['header-tags-container']">
      <div :class="styles.header">
        <div :class="styles.id"><Skeleton /></div>
      </div>
      <div :class="styles.types">
        <div :class="styles.type">
          <Skeleton />
        </div>
        <div :class="styles.type">
          <Skeleton />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'
import Skeleton from '@/components/Skeleton.vue'

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
  border-radius: 0.625rem;
  box-shadow: 10px 10px 60px var(--box-shadow-color);
  transition: transform 0.5s ease-in-out;
  padding: 1rem;
  height: 6.75rem;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header {
  position: relative;
}

.id {
  color: var(--number-title-color);
  font-weight: 500;
  font-size: 4rem;
  height: 4.5rem;
  width: 9.875rem;
}

.img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.name {
  font-size: 1.25rem;
  font-weight: 400;
  width: 7rem;
  height: 2rem;
  margin-bottom: 0.5rem;
}

.classification {
  font-size: 0.8125rem;
  font-weight: 300;
  padding-bottom: 1rem;
  height: 1rem;
  width: 6rem;
}

.tags {
  position: relative;
  padding-top: 1rem;
  flex: 1 1 auto;
  font-size: 0.875rem;
}

.favorite {
  align-self: flex-start;
}

.name-classification-fav-container {
  display: flex;
  flex-direction: column;
}

.header-tags-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 9.875rem;
}

.type {
  height: 1.125rem;
  width: 100%;
}

.types {
  padding-top: 1rem;
  height: 4.5rem;
  width: 9.875rem;
  display: flex;
  gap: 1rem;
}

.favorite-container {
  align-self: flex-start;
  display: flex;
  align-items: flex-end;
  flex: 1 1 auto;

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
