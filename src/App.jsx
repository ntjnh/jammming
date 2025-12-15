import { useEffect, useRef, useState } from 'react'
import './App.css'

import authentication from './features/auth/authentication'
import getRefreshToken from './features/auth/getRefreshToken'
import getToken from './features/auth/getToken'
import addTrack from './features/playlist/addTrack'
import createPlaylist from './features/playlist/createPlaylist'
import removeTrack from './features/playlist/removeTrack'
import savePlaylist from './features/playlist/savePlaylist'
import searchTracks from './features/search/searchTracks'
import getProfile from './features/user/getProfile'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App({ handleSave, handleSearch, initialResults }) {
    const searchRef = useRef(null)
    const playlistRef = useRef(null)
    const [results, setResults] = useState(initialResults || { tracks: { items: []}})
    const [searching, setSearching] = useState(false)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [playlistName, setPlaylistName] = useState('New Playlist 1')
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [accessToken, setAccessToken] = useState('')
    const [playlistUris, setPlaylistUris] = useState([])

    const onPlaylistNameChange = e => setPlaylistName(e.target.value)

    const handleAddTrack = e => {
        const updated = addTrack(e.target.id, results, playlistTracks, playlistUris)

        setPlaylistTracks(updated.playlistTracks)
        setPlaylistUris(updated.playlistUris)
    }

    const handleRemoveTrack = e => {
        const idx = e.target.dataset.idx
        const updated = removeTrack(Number(idx), playlistTracks, playlistUris)

        setPlaylistTracks(updated.playlistTracks)
        setPlaylistUris(updated.playlistUris)
    }

    useEffect(() => {
        const storedToken = window.localStorage.access_token

        if (window.location.pathname === '/callback') {
            if (!storedToken || storedToken.length < 50) {
                const generateToken = async () => await getToken()
                setAccessToken(generateToken)
            }
        }
        
        if (storedToken && storedToken.length > 50) {
            setAccessToken(storedToken)
        }
        
        if (localStorage.getItem('token_expired') === 'true') {
            const refreshToken = async () => await getRefreshToken(setAccessToken)
            refreshToken()
        }
    }, [])

    const handleTestSubmit = e => {
        e.preventDefault()
        handleSearch(e, searchRef, setResults)
    }

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

    const handleSavePlaylist = async e => {
        e.preventDefault()
        setSaving(true)

        try {
            const userId = localStorage.getItem('user_id')
            const plName = playlistRef.current.value
            const playlistId = await createPlaylist(userId, plName, accessToken)
            await savePlaylist(playlistId, playlistUris, accessToken)

            setPlaylistName('')
            setPlaylistUris([])
            setPlaylistTracks([])
            setSaved(true)
            setSaving(false)
        } catch(err) {
            console.error(err)
        }
    }

    return (
        <>
            <Header />

            <main>
                <div className="bg"></div>
                <div className="container">
                    <SearchBar
                        searchRef={searchRef}
                        onSubmit={handleSearch ? handleTestSubmit : handleSubmit} />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults
                                data={results.tracks.items}
                                searching={searching}
                                onAdd={handleAddTrack}
                                setPlaylistTracks={setPlaylistTracks} />
                        </div>

                        <div className="column column--right">
                            <Playlist
                                onPlaylistNameChange={onPlaylistNameChange}
                                onSave={handleSave || handleSavePlaylist}
                                onRemove={handleRemoveTrack}
                                playlistName={playlistName}
                                playlistRef={playlistRef}
                                playlistTracks={playlistTracks}
                                saved={saved}
                                saving={saving}
                                setPlaylistTracks={setPlaylistTracks}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    )
}

export default App
