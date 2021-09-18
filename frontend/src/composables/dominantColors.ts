import Color from 'color'
import rgbaster from 'rgbaster'
import { reactive, toRefs } from 'vue'

export function useGetDominantColors(backgroundColor = '#FFFFFF', textColor = '#000000') {
  const vals = reactive({
    backgroundColor,
    textColor,
  })

  async function analyze(image: string) {
    const result = await rgbaster(image)
    vals.backgroundColor = result?.[0].color ?? backgroundColor
    vals.textColor = new Color(vals.backgroundColor).isLight() ? '#000000' : '#FFFFFF'
  }

  return { analyze, ...toRefs(vals) }
}
