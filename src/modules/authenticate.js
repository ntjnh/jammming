const authenticate = () => {
    const client_id = import.meta.env.VITE_CLIENT_ID
    const redirect_uri = 'http://localhost:5173/callback'
    const scope = `playlist-modify-private playlist-modify-public`

    let url = `//accounts.spotify.com/authorize`
    url += `?client_id=${client_id}`
    url += `&response_type=token`
    url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`
    url += `&state=you1aint3that5dude`
    url += `&scope=${scope}`

    window.location = url
}

export default authenticate
