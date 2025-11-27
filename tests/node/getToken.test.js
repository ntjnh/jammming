import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { server } from '../mocks/node'
import { lastTokenRequestBody } from '../mocks/handlers'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Get access token', () => {
    const endpoint = `https://accounts.spotify.com/api/token`
    const clientId = 'TEST_client_id'
    const redirectUri = 'http://localhost:5173/callback'
    const grantType = 'authorization_code'
    const code = 'TEST_code'
    const codeVerifier = 'TEST_VERIFIER_123'

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: grantType,
            code: code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        })
    }

    it('Sends correct POST body', async () => {
        await fetch(endpoint, payload)

        expect(lastTokenRequestBody.get('client_id')).toBe(clientId)
        expect(lastTokenRequestBody.get('code')).toBe(code)
        expect(lastTokenRequestBody.get('grant_type')).toBe(grantType)
        expect(lastTokenRequestBody.get('code_verifier')).toBe(codeVerifier)
        expect(lastTokenRequestBody.get('redirect_uri')).toBe(redirectUri)
    })

    it('Responds with access and refresh tokens', async () => {
        const response = await fetch(endpoint, payload)

        await expect(response.json()).resolves.toEqual({
            access_token: 'TEST_access_token',
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: 'TEST_refresh_token',
            scope: 'playlist-modify-private playlist-modify-public'
        })
    })
})
