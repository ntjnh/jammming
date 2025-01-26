const getAccessToken = (hash, setAccessToken) => {

    const urlHash = hash.replace('#', '')
    const urlHashArray = urlHash.split('&')

    const [accessToken, tokenType, expiresIn, state] = urlHashArray.map(parameter => {
        parameter.slice(parameter.indexOf('=') + 1, parameter.length)
    })

    setAccessToken(accessToken)
}

export default getAccessToken
