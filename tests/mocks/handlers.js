import { http, HttpResponse } from 'msw'
import tracks from './songs'
import { expect } from 'vitest'

let lastTokenRequestBody = null

export const handlers = [
    http.get(`https://api.spotify.com/v1/search`, () => {
        return HttpResponse.json(tracks)
    }),
    http.post(`https://accounts.spotify.com/api/token`, async ({ request }) => {
        const raw = await request.text()
        lastTokenRequestBody = new URLSearchParams(raw)

        return HttpResponse.json({
            access_token: 'TEST_access_token',
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: 'TEST_refresh_token',
            scope: 'playlist-modify-private playlist-modify-public'
        })
    }),
    http.post(
        `https://api.spotify.com/v1/users/:userId/playlists`,
        async ({ request, params }) => {
            const { userId } = params

            const data = await request.json()

            expect(data).toEqual({
                name: expect.any(String),
                description: expect.any(String),
                public: false
            })

            return HttpResponse.json({
                id: 'NEW_PLAYLIST_ID',
                name: data.name,
                description: data.description,
                public: false,
                owner: {
                    id: userId
                }
            })
        }
    ),
    http.post(
        `https://api.spotify.com/v1/playlists/:playlistId/tracks`,
        async ({ request }) => {
            const data = await request.json()

            expect(data).toEqual({
                uris: [
                    'spotify:track:abc123def',
                    'spotify:track:123abc456',
                    'spotify:track:def789ghi'
                ]
            })

            return HttpResponse.json({
                snapshot_id: 'TEST_snapshot_id'
            })
        }
    )
]

export { lastTokenRequestBody }
