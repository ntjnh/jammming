const getProfile = async accessToken => {
    await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP Error. Status: ${res.status} - ${res.message}`)
        }

        return res.json()
    })
    .then(data => {
        localStorage.setItem('user_id', data.id)
        return data
    })
    .catch(e => console.error(e))
}

export default getProfile
