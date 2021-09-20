import { POKEMON_BY_NAME_QUERY } from '@/graphql/graphql-queries'
import { PokemonByNameQueryResponse } from '@/types'
import { useQuery, useResult } from '@vue/apollo-composable'

export function usePokemonByNameQuery(name: string) {
  const { result, loading, error, refetch } = useQuery<PokemonByNameQueryResponse>(POKEMON_BY_NAME_QUERY, {
    name,
  })

  const pokemon = useResult(result)

  return {
    pokemon,
    loading,
    error,
    refetch,
  }
}
