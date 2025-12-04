const getRefreshToken = async setAccessToken => {
    const clientId = import.meta.env.VITE_CLIENT_ID
    const { localStorage } = window

   // refresh token that has been previously stored
   const refreshToken = localStorage.getItem('refresh_token')
   const url = 'https://accounts.spotify.com/api/token'

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        })
    }
    const body = await fetch(url, payload)
    const response = await body.json()

    localStorage.setItem('access_token', response.access_token)

    if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token)
        localStorage.setItem('token_expired', false)
        setAccessToken(response.access_token)
    }
}

export default getRefreshToken
