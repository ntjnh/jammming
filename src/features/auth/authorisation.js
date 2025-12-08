// When we have an access token, then the application has full authorisation


export default async function authorisation() {

    /* Response:

    {
        access_token: string,
        token_type: 'Bearer',
        scope: string,
        expires_in: int,
        refresh_token: string

    }

    */

    /* Error response:

    {
        message: 'Invalid access token',
        status: 401
    }

    */

    // 401 - Invalid access token
    // 401 - 


}


export const tokenExpired = async accessToken => {
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
