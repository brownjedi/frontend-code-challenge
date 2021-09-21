import { FAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import { extractVariablesFromFieldName } from '@/graphql/utils'
import { FavoriteQueryResponse } from '@/types'
import { Reference } from '@apollo/client/cache'
import { useMutation } from '@vue/apollo-composable'

export function useFavoritePokemonMutation() {
  const { mutate, loading, error } = useMutation<FavoriteQueryResponse>(FAVORITE_POKEMON_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          pokemons: (previous, { toReference, storeFieldName, readField }) => {
            if (data?.pokemon) {
              console.log(data.pokemon)
              const variables = extractVariablesFromFieldName(storeFieldName)
              const updatedPokemonRef = toReference(data.pokemon)
              const types = [...(readField('types', updatedPokemonRef) as string[]), '']
              if (
                variables?.query?.filter?.isFavorite &&
                updatedPokemonRef?.__ref &&
                types.indexOf(variables?.query?.filter?.type) !== -1
              ) {
                // Quick safety check - if the pokemon is already
                // present in the edges, we don't need to add it again.
                if (previous.edges.some((ref: Reference) => readField('id', ref) === data.pokemon.id)) {
                  return previous
                }

                return {
                  ...previous,
                  count: previous.count + 1,
                  edges: [...previous.edges, updatedPokemonRef].sort((a: Reference, b: Reference) => {
                    const aId = readField('id', a) as string
                    const bId = readField('id', b) as string
                    if (aId > bId) return 1
                    if (aId < bId) return -1
                    return 0
                  }),
                }
              }
            }
            return previous
          },
        },
      })
    },
  })

  return {
    mutate,
    loading,
    error,
  }
}
