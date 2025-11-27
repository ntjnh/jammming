import { http, HttpResponse } from 'msw'
import tracks from './songs'

export const handlers = [
    http.get(`https://api.spotify.com/v1/search`, () => {
        return HttpResponse.json(tracks)
    }),
    http.post(`https://accounts.spotify.com/api/token`, () => {
        return HttpResponse.json({
            access_token: 'BQAdaZjTbjYsiLoMVvVJSZ3GpAkb2GFeAAz3MyahsN400Y1_G4OVX8PEfHOSJ5focV7rVZ0WRDysWtzqdjhkyDyyiYl60W5IWR_LjU9dvmSEONUmT61NYnSs2yNh3GpmRQtwfBhlGayRp2seB8AL2XKx_Q26xRr4ZsXRcL5hQnqfEEy3-ylr-NQcwpi8mc3wa91eKj8aylAsjtADCg42V12_ihkSXGsgVqoELrokElmRNDS1PuCWMWZnmGh-nR4pTHc1rjuUhVURtnclP-D_oBEbFDAOZrhZQiJSA1O-_bMHVwFWY-I',
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: 'AQA9GR_OuSRAqV3TuN9L2W1y2sPnhJPDzCcdW-X0cKvwvJbKFLJKuEaOXbhx-jq6rA4USlJTPUz8ww-9szHAAdc4mxdIhrtKAa91X4gL2opuyGryIu26QH1tTFaCC3VfeGk',
            scope: 'playlist-modify-private playlist-modify-public'
        })
    })
]


/*

Redirect URI with authorisation code query parameter:

http://localhost:5173/callback?code=AQCRc76EtAgV40_KdL3_gn7S-NSaLiez2ZtkAMIBOfqah6rUwh7ah_VbR3div9Bd5VOCKGm8TykLsN_5nuDFqUSvL1Y8EUodHnCWbMme6DW5G-8NRQUMnSCbdPvqpua7AxBkYyLlnNCZJaVNEykza71erSx2l5obo28epanqx91LK3Akf-TH_HXellDADHIHB9QU_88Koc9RyrNlbpZLS-2N8XAZnF3WYR-hU_9VipaTxeNVEIyGJOi6f-dHox5JIvkVCCaoNnDATCBUXxwqxLdsCuZayZsKs7BpOYjQOIFPWG-LG_g

RESPONSE:

{
  "access_token": "BQCSJunWXxw8DJc43dgIE74T_cEzvLPv-JIg1JmcYLDxMSAVzgu_YXQMpZmc5Qw_ViVabrZIdh0GW7smw1UzhEVFGn0WlAT_sJ74sZUj1TMBkDUcGF9kYDnRRFgXSPF6fXHyjM1_c74UxiSI0i9EwMdroXm4O29KWNZYAzv1TYKIf-unLtHMnfbMv4a1YYc3JiSCz-pcSG-thsiTS_A80CO0AQQS1pH8xZhXsTkQvqbaHmGoRhgmWmbnkopaCGwtcji-UtShilhHtvgD4DvXeA0SSjK9Il9KWN0rWj2rOtwTnk-PUlY",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "AQBq9pPvupYvs5Fonrqp9eJ5xgmoSY4ya8Mun97FBd8Kxx1bO8KeX7SqNvKKNfIBy3nHdXXCfiZJ3IkzhKTEgsq2dSmtT6fiLDp6E_CCGBNM_knbpjub2JFYTwl8vr5DOp4",
  "scope": "playlist-modify-private playlist-modify-public"
}

LOCALSTORAGE:

{
  "refresh_token": "AQBq9pPvupYvs5Fonrqp9eJ5xgmoSY4ya8Mun97FBd8Kxx1bO8KeX7SqNvKKNfIBy3nHdXXCfiZJ3IkzhKTEgsq2dSmtT6fiLDp6E_CCGBNM_knbpjub2JFYTwl8vr5DOp4",
  "tokenExpired": "false",
  "code_verifier": "WFBFBRFOknFAUyQArjhTlo0ipSDPlE0DA8fQ4ACY1tbgAhRKG2PG0Inp4PsJvMt3",
  "access_token": "BQCSJunWXxw8DJc43dgIE74T_cEzvLPv-JIg1JmcYLDxMSAVzgu_YXQMpZmc5Qw_ViVabrZIdh0GW7smw1UzhEVFGn0WlAT_sJ74sZUj1TMBkDUcGF9kYDnRRFgXSPF6fXHyjM1_c74UxiSI0i9EwMdroXm4O29KWNZYAzv1TYKIf-unLtHMnfbMv4a1YYc3JiSCz-pcSG-thsiTS_A80CO0AQQS1pH8xZhXsTkQvqbaHmGoRhgmWmbnkopaCGwtcji-UtShilhHtvgD4DvXeA0SSjK9Il9KWN0rWj2rOtwTnk-PUlY"
}

*/