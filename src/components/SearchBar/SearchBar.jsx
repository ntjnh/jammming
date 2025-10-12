import { useRef } from 'react'
import Button from '../Button/Button'
import styles from './SearchBar.module.css'
import authentication from '../../modules/authentication'

export default function SearchBar({
    accessToken,
    getProfile,
    setResults
    
}) {
    const searchRef = useRef(null)

    const handleSubmit = async e => {
        e.preventDefault()

        // check for token
        if (!accessToken) {
            await authentication()
            getProfile()
        }

        const query = searchRef.current.value
        const type = 'track'
        const market = 'GB'
        const limit = 10
        let endpoint = 'https://api.spotify.com/v1/search'
        endpoint += `?q=${query}&type=${type}&market=${market}&limit=${limit}`

        await fetch(endpoint, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then(response => response.json())
        .then(data => {
            // console.log(`Search request`)

            if (data.error) {
                const errorStatus = data.error.status
                const errorMessage = data.error.message

                console.log(`HTTP Error ${errorStatus}: ${errorMessage}`)

                if (errorMessage.includes('access token expired')) {
                    localStorage.setItem('tokenExpired', true)
                    localStorage.setItem('user_id', '')
                }
            }

            // console.log('full response:')
            // console.log(data)
            setResults(data)
        })
        .catch(e => console.log(e))
    }

    return (
        <section className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    ref={searchRef}
                    placeholder="Enter a song title"
                    required />

                <Button style="search" label="Search" />
            </form>
        </section>
    )
}
