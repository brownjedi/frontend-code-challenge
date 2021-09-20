import { POKEMONS_QUERY } from '@/graphql/graphql-queries'
import { PokemonsQueryResponse, PokemonsQueryInput } from '@/types'
import { useQuery, useResult } from '@vue/apollo-composable'

export function usePokemonsQuery(query: PokemonsQueryInput = {}) {
  const { result, loading, error, refetch, fetchMore } = useQuery<PokemonsQueryResponse>(POKEMONS_QUERY, { query })

  const pokemonList = useResult(result)

  return {
    pokemonList,
    loading,
    error,
    refetch,
    fetchMore,
  }
}
