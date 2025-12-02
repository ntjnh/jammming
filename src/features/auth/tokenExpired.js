const tokenExpired = async accessToken => {
    let hasExpired = false

    await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            let e = data.error

            if (e) {
                if (e.message.includes('token expired')) {
                    hasExpired = true
                }
            }
        })
        .catch(e => console.error(e))

    return hasExpired
}

export default tokenExpired
