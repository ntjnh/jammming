// When we have an access token, then the application has full authorisation

import authentication from './authentication'
import getToken from './getToken'

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
