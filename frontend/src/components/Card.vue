<template>
  <div
    :class="styles.container"
    @mouseenter="setAnimated(true)"
    @mouseleave="setAnimated(false)"
    @click="navigateToPokemon"
  >
    <div :class="styles.header">
      <div :class="styles.img">
        <img :src="currentSprite" :alt="name" />
      </div>
      <div :class="styles.id">#{{ id }}</div>
    </div>
    <div :class="styles.name">{{ name }}</div>
    <div :class="styles.classification">{{ classification }}</div>
    <div :class="styles.types">
      <div
        :class="styles.type"
        v-for="type in types"
        :key="type"
        :style="{ color: `var(--${type.toLowerCase()}-text-color)` }"
      >
        {{ type }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useCssModule } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    normalSprite: {
      type: String,
      required: true,
    },
    animatedSprite: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const styles = useCssModule()
    const currentSprite = ref(props.normalSprite)
    return { styles, currentSprite }
  },
  methods: {
    setAnimated(val: boolean) {
      this.currentSprite = val ? this.$props.animatedSprite : this.$props.normalSprite
    },
    navigateToPokemon() {
      this.$router.push(`/${this.$props.name}`)
    },
  },
})
</script>

<style lang="scss" module>
.container {
  width: 18.75rem;
  height: 16rem;
  border-radius: 0.625rem;
  box-shadow: 10px 10px 60px #e9e8e7;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: scale(1.2);
    cursor: pointer;
  }

  display: flex;
  flex-direction: column;
}

.header {
  position: relative;
}

.id {
  color: var(--number-title-color);
  font-weight: 500;
  font-size: 6.25rem;
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
  text-align: center;
}

.classification {
  font-size: 0.8125rem;
  font-weight: 300;
  padding-top: 0.3rem;
  text-align: center;
}

.types {
  position: relative;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.type {
  text-transform: uppercase;
}

.types * + * {
  margin-left: 1rem;
}
</style>
