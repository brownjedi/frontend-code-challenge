import { gql } from '@apollo/client/core'

export const typeDefs = gql`
  extend type Pokemon {
    rgbaster: RGBaster!
  }

  type RGBaster {
    backgroundColor: String
    textColor: String
  }
`
