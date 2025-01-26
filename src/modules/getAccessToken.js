import generateRandomString from "./generateRandomString"

const getAccessToken = () => {
    const client_id = import.meta.env.CLIENT_ID
    const redirect_uri = 'http://localhost:5173/'
    const state = generateRandomString(16)
    const scope = `playlist-modify-private playlist-modify-public`

    let url = `https://accounts.spotify.com/authorize`
    url += `?client_id=${client_id}`
    url += `&response_type=token`
    url += `&redirect_uri=${redirect_uri}`
    url += `&state=you1aint3that5dude`
    url += `&scope=${scope}`

    // https://accounts.spotify.com/authorize?client_id=ABCDEFG&response_type=token&redirect_uri=http://localhost:5173&state=you1aint3that5dude&scope=playlist-modify-private%20playlist-modify-public


    const accessToken = ''
    const expirationTime = ''

    return accessToken
}

export default getAccessToken
