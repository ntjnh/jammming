import { useRef } from 'react'
import Button from '../Button/Button'
import styles from './SearchBar.module.css'
import authentication from '../../features/auth/authentication'
import getProfile from '../../features/user/getProfile'

export default function SearchBar({
    accessToken,
    setSearching,
    setResults
}) {
    const searchRef = useRef(null)

    const handleSubmit = async e => {
        e.preventDefault()

        setSearching(prev => !prev)

        // check for token first
        if (!accessToken) {
            await authentication()
            getProfile(accessToken)
        } else {
            getProfile(accessToken)
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
        .then(res => {
            if (!res.ok) {
                throw new Error(`HTTP Error. Status: ${res.status} - ${res.message}`)
            }

            return res.json()
        })
        .then(data => {
            // console.log('full response:')
            // console.log(data)
            setResults(data)
            setSearching(prev => !prev)
        })
        .catch(e => console.log(e))
    }

    // const handleSearch = e => {
    //     e.preventDefault()
    //     const query = searchRef.current.value.toLowerCase()

    //     setResults(prev => {
    //         prev.tracks.items = prev.tracks.items
    //             .filter(t => t.name.toLowerCase().includes(query))
    //         return prev
    //     })
    // }

    return (
        <section className={styles.search}>
            <form onSubmit={handleSubmit} data-testid="search">
                <input
                    type="text"
                    name="search"
                    ref={searchRef}
                    placeholder="Enter a song title, album or artist"
                    required />

                <Button isActive={true} style="search" label="Search" />
            </form>
        </section>
    )
}
