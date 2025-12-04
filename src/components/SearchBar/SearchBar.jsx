import { useRef } from 'react'
import Button from '../Button/Button'
import styles from './SearchBar.module.css'
import authentication from '../../features/auth/authentication'
import getProfile from '../../features/user/getProfile'
import searchTracks from '../../features/search/searchTracks'

export default function SearchBar({ accessToken, setSearching, setResults }) {
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
        const tracks = await searchTracks(query, accessToken)

        setResults(tracks)
        setSearching(prev => !prev)
    }

    // // test search handler
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
