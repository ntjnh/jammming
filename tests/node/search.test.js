import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { server } from '../mocks/node'
import tracks from '../mocks/songs'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Search for a track', () => {
    it('responds with 10 search results', async () => {
        const endpoint = `https://api.spotify.com/v1/search`
        const response = await fetch(endpoint)
        const data = response.json()
        const results = data.then(data => data.tracks.items)

        await expect(data).resolves.toEqual(tracks)
        await expect(results).resolves.toHaveLength(10)
    })
})
