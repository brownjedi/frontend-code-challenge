import { UNFAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import { extractVariablesFromFieldName } from '@/graphql/utils'
import { UnFavoriteQueryResponse } from '@/types'
import { Reference } from '@apollo/client/cache'
import { useMutation } from '@vue/apollo-composable'

export function useUnFavoritePokemonMutation() {
  const { mutate, loading, error } = useMutation<UnFavoriteQueryResponse>(UNFAVORITE_POKEMON_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          pokemons: (previous, { toReference, storeFieldName, readField }) => {
            if (data?.pokemon) {
              const variables = extractVariablesFromFieldName(storeFieldName)
              const updatedPokemonRef = toReference(data.pokemon)
              const types = [...(readField('types', updatedPokemonRef) as string[]), '']
              if (
                variables?.query?.filter?.isFavorite &&
                updatedPokemonRef?.__ref &&
                types.indexOf(variables?.query?.filter?.type) !== -1
              ) {
                // Quick safety check - if the pokemon is already
                // removed in the edges, we don't need to remove it again.
                if (!previous.edges.some((ref: Reference) => readField('id', ref) === data.pokemon.id)) {
                  return previous
                }

                return {
                  ...previous,
                  count: previous.count - 1,
                  edges: previous.edges.filter((x: Reference) => x.__ref !== updatedPokemonRef.__ref),
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
