const getToken = async () => {
    const { localStorage, location } = window

    // We must parse the URL to retrieve the code parameter
    const urlParams = new URLSearchParams(location.search)
    const code = urlParams.get('code')

    return await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: import.meta.env.VITE_CLIENT_ID,
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://127.0.0.1:5173/callback',
            code_verifier: localStorage.getItem('code_verifier')
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP Error. Status: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            if (data.error) {
                throw new Error(`${data.error.status} ${data.error.message}`)
            }

            localStorage.setItem('access_token', data.access_token)
            localStorage.setItem('refresh_token', data.refresh_token)
            localStorage.setItem('token_expired', false)

            return data.access_token
        })
        .catch(error => console.error(error))
}

export default getToken
