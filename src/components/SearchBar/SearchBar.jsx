import { useRef } from 'react'
import Button from '../Button/Button'
import styles from './SearchBar.module.css'

export default function SearchBar({ accessToken, setResults }) {
    const searchRef = useRef(null)

    const handleSubmit = async e => {
        e.preventDefault()

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
        .then(data => setResults(data))
        .catch(e => console.error(e))
    }

    return (
        <section className={styles.search}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="song"
                    id="song"
                    ref={searchRef}
                    placeholder="Enter a song title" />

                <Button style="search" label="Search" />
            </form>
        </section>
    )
}
