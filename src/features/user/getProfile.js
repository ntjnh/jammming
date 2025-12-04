const getProfile = async accessToken => {
    await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            throw new Error(`${data.error.status} ${data.error.message}`)
        }

        localStorage.setItem('user_id', data.id)
        return data
    })
    .catch(e => console.error(e))
}

export default getProfile
