import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { server } from '../mocks/node'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Save playlist', () => {
    const accessToken = 'TEST_access_token'

    it('Creates a playlist', async () => {
        const endpoint = `https://api.spotify.com/v1/users/TEST_user_id/playlists`
        const playlistName = 'Jammmz'

        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                name: playlistName,
                description: `${playlistName} playlist`,
                public: false
            }),
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()

        expect(result).toEqual({
            id: 'NEW_PLAYLIST_ID',
            name: playlistName,
            description: `${playlistName} playlist`,
            public: false,
            owner: {
                id: 'TEST_user_id'
            }
        })
    })

    it('Saves tracks to the playlist', async () => {
        const endpoint = `https://api.spotify.com/v1/playlists/TEST_playlist_id/tracks`
        const playlist = [
            'spotify:track:abc123def',
            'spotify:track:123abc456',
            'spotify:track:def789ghi'
        ]

        const response = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify({
                uris: playlist
            }),
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()

        expect(result).toEqual({
            snapshot_id: 'TEST_snapshot_id'
        })
    })
})
