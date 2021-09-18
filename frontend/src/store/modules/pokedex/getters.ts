import { GetterTree } from 'vuex'
import { RootState } from '@/store/types'
import { State } from './types'

export type Getters = Record<string, never>

export const getters: GetterTree<State, RootState> & Getters = {}
