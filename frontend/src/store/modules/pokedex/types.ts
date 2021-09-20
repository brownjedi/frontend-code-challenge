export interface State {
  query: {
    search?: string
    filter?: {
      type?: string
      isFavorite?: boolean
    }
  }
}
