// Log in to Spotify and grant access to the application - scope is what we're
// allowing the application to do

import { base64encode, generateCodeVerifier, sha256 } from './codeChallenge'

export default async function authentication() {
    const clientId = import.meta.env.VITE_CLIENT_ID
    const redirectUri = 'http://localhost:5173/callback'
    
    const scope = 'playlist-modify-private playlist-modify-public'
    const authUrl = new URL('https://accounts.spotify.com/authorize')
    
    const codeVerifier = generateCodeVerifier()
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed)

    const { localStorage, location } = window
    
    localStorage.setItem('code_verifier', codeVerifier)
    
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri
    }
    
    authUrl.search = new URLSearchParams(params).toString()
    location.href = authUrl.toString()
}
