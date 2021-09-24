import { UNFAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import { extractVariablesFromFieldName } from '@/graphql/utils'
import { PokemonListApolloCache, UnFavoriteQueryResponse } from '@/types'
import { Reference } from '@apollo/client/cache'
import { useMutation } from '@vue/apollo-composable'
import produce from 'immer'

export function useUnFavoritePokemonMutation() {
  const { mutate, loading, error } = useMutation<UnFavoriteQueryResponse>(UNFAVORITE_POKEMON_MUTATION, {
    update(cache, { data }) {
      cache.modify({
        fields: {
          pokemons: (previous: PokemonListApolloCache, { toReference, storeFieldName, readField }) => {
            if (data?.pokemon) {
              const variables = extractVariablesFromFieldName(storeFieldName)
              const updatedPokemonRef = toReference(data.pokemon)
              const types = [...(readField('types', updatedPokemonRef) as string[]), '']
              if (variables?.query?.filter?.isFavorite && types.indexOf(variables?.query?.filter?.type) !== -1) {
                // Quick safety check - if the pokemon is already
                // removed in the edges, we don't need to remove it again.
                if (!previous.edges.some((ref: Reference) => readField('id', ref) === data.pokemon.id)) {
                  return previous
                }

                const nextState = produce(previous, draftState => {
                  draftState.count -= 1
                  draftState.edges = draftState.edges.filter(x => x.__ref !== updatedPokemonRef?.__ref)
                })

                return nextState
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
