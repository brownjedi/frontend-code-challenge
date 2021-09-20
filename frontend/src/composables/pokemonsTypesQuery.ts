import { PokemonTypesQueryResponse } from '@/types'
import { useQuery, useResult } from '@vue/apollo-composable'
import { POKEMON_TYPES_QUERY } from '@/graphql/graphql-queries'

export function usePokemonTypesQuery() {
  const { result, loading, error, refetch } = useQuery<PokemonTypesQueryResponse>(POKEMON_TYPES_QUERY)

  const types = useResult(result)

  return {
    types,
    loading,
    error,
    refetch,
  }
}
