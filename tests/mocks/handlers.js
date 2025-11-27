import { http, HttpResponse } from 'msw'
import tracks from './songs'

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
    })
]

export { lastTokenRequestBody }
