const searchTracks = async (query, accessToken) => {
    return await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=GB&limit=10`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            throw new Error(`${data.error.status} ${data.error.message}`)
        }

        return data
    })
    .catch(e => console.error(e))
}

export default searchTracks
