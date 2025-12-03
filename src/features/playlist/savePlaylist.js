const savePlaylist = async (playlist, accessToken) => {
    const id = localStorage.getItem('playlist_id')

    await fetch(`https://api.spotify.com/v1/playlists/${id}/tracks`, {
        method: 'POST',
        body: JSON.stringify({
            uris: playlist
        }),
        headers: {
            Authorization: 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP Error. Status: ${res.status} - ${res.message}`)
        }

        return res.json()
    })
    .then(data => {
        if (data.snapshot_id) {
            localStorage.setItem('playlist_saved', true)

            return data
        }
    })
}

export default savePlaylist
