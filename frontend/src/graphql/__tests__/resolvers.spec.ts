import { resolvers } from '@/graphql/resolvers'

const mockFn = jest.fn()

jest.mock('rgbaster', () => ({
  __esModule: true, // this property makes it work
  default: () => mockFn(),
}))

describe('graphql/resolvers.ts', () => {
  beforeEach(() => jest.resetAllMocks())

  it('returns proper response for rgbaster', async () => {
    const backgroundColor = '#F29700'
    const textColor = '#000000'
    mockFn.mockResolvedValueOnce([{ color: backgroundColor }])

    const result = await resolvers.Pokemon.rgbaster({
      image: 'https://someurl',
    })
    expect(result.backgroundColor).toBe(backgroundColor)
    expect(result.textColor).toBe(textColor)
  })

  it('returns default response in case rgbaster fails', async () => {
    const defaultBackgroundColor = '#FFFFFF'
    const textColor = '#000000'
    mockFn.mockResolvedValueOnce(null)

    const result = await resolvers.Pokemon.rgbaster({
      image: 'https://someurl',
    })
    expect(result.backgroundColor).toBe(defaultBackgroundColor)
    expect(result.textColor).toBe(textColor)
  })
})
