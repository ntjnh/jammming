const getToken = async setAccessToken => {
    // We must parse the URL to retrieve the code parameter
    const urlParams = new URLSearchParams(window.location.search)
    let code = urlParams.get('code')

    const clientId = import.meta.env.VITE_CLIENT_ID
    const redirectUri = 'http://localhost:5173/callback'
    const codeVerifier = localStorage.getItem('code_verifier')

    const url = 'https://accounts.spotify.com/api/token'
    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            code_verifier: codeVerifier
        })
    }

    await fetch(url, payload)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error. Status: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('tokenExpired', false)
            setAccessToken(data.access_token)
        })
        .catch(error => console.error(error))
}

export default getToken
