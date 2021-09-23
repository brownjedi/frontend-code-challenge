export interface State {
  query: {
    search?: string
    filter: {
      type?: string
    }
  }
  ui: {
    color: string
  }
}
