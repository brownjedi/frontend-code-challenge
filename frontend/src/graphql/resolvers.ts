import Color from 'color'
import rgbaster from 'rgbaster'
import { PokemonInfo, RGBaster } from '@/types'

export const resolvers = {
  Pokemon: {
    rgbaster: async (_root: Pick<PokemonInfo, 'image'>): Promise<RGBaster> => {
      const rgbasterResult = await rgbaster(_root.image)
      const backgroundColor = rgbasterResult?.[0].color ?? '#FFFFFF'
      const textColor = new Color(backgroundColor).isLight() ? '#000000' : '#FFFFFF'
      return { backgroundColor, textColor }
    },
  },
}
