<template>
  <div :class="styles.skeleton"></div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  setup() {
    const styles = useCssModule()

    return { styles }
  },
})
</script>

<style lang="scss" module>
/* The loading Class */
.skeleton {
  position: relative;
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
}

/* The moving element */
.skeleton::after {
  display: block;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(transparent),
    color-stop(rgba(255, 255, 255, 0.2)),
    to(transparent)
  );

  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);

  /* Adding animation */
  animation: loading 1.2s infinite;
}

/* Loading Animation */
@keyframes loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}
</style>
