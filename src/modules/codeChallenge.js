// The PKCE authorization flow starts with the creation of a code verifier.
// According to the PKCE standard, a code verifier is a high-entropy 
// cryptographic random string with a length between 43 and 128 characters 
// (the longer the better). It can contain letters, digits, underscores, 
// periods, hyphens, or tildes.
export const generateCodeVerifier = () => {
    const generateRandomString = length => {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const values = crypto.getRandomValues(new Uint8Array(length))
        return values.reduce((acc, x) => acc + possible[x % possible.length], "")
    }
    
    return generateRandomString(64)
}

// Once the code verifier has been generated, we must transform (hash) it 
// using the SHA256 algorithm. This is the value that will be sent within the 
// user authorization request.
export const sha256 = async verifier => {
    const encoder = new TextEncoder()
    const data = encoder.encode(verifier)
    return window.crypto.subtle.digest('SHA-256', data)
}

// Implement a function base64encode that returns the base64 representation of 
// the digest we just calculated with the sha256 function
export const base64encode = input => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}
