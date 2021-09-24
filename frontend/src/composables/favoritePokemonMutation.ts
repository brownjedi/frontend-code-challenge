import { FAVORITE_POKEMON_MUTATION } from '@/graphql/graphql-queries'
import { extractVariablesFromFieldName } from '@/graphql/utils'
import { FavoriteQueryResponse, PokemonListApolloCache } from '@/types'
import { Reference } from '@apollo/client/cache'
import { useMutation } from '@vue/apollo-composable'
import produce from 'immer'

export function useFavoritePokemonMutation() {
  const { mutate, loading, error } = useMutation<FavoriteQueryResponse>(FAVORITE_POKEMON_MUTATION, {
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
                // present in the edges, we don't need to add it again.
                if (previous.edges.some((ref: Reference) => readField('id', ref) === data.pokemon.id)) {
                  return previous
                }

                const nextState = produce(previous, draftState => {
                  draftState.count += 1
                  updatedPokemonRef && draftState.edges.push(updatedPokemonRef)
                  draftState.edges.sort((a: Reference, b: Reference) => {
                    const aId = readField('id', a) as string
                    const bId = readField('id', b) as string
                    if (aId > bId) return 1
                    if (aId < bId) return -1
                    return 0
                  })
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
