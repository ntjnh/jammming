const createPlaylist = async (userId, playlistName, accessToken) => {
    return await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        body: JSON.stringify({
            name: playlistName,
            description: `${playlistName} playlist (Created by Jammming)`,
            public: false
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
        if (data.error) {
            const errorStatus = data.error.status
            const errorMessage = data.error.message

            if (errorMessage.includes('access token expired')) {
                localStorage.setItem('token_expired', true)
                localStorage.setItem('user_id', '')
            }

            console.error(errorMessage)
            throw new Error(`HTTP Error. Status: ${errorStatus}`)
        } else {
            localStorage.setItem('playlist_id', data.id)
            return data.id
        }
    })
}

export default createPlaylist
