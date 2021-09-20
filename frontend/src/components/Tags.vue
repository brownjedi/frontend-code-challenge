<template>
  <div :class="styles.tags">
    <div
      :class="styles.tag"
      v-for="tag in tags"
      :key="tag"
      :style="{ color: `var(--${tag.toLowerCase()}-text-color)` }"
    >
      {{ tag }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useCssModule } from 'vue'

export default defineComponent({
  props: {
    tags: {
      required: true,
      type: Array,
    },
  },
  setup() {
    const styles = useCssModule()

    return { styles }
  },
})
</script>

<style lang="scss" module>
.tags {
  display: flex;
}

.tag {
  text-transform: uppercase;
}

.tags > * + * {
  margin-left: 1rem;
}
</style>
