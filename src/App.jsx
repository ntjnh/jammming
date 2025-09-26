import { useEffect, useState } from 'react'
import './App.css'

import authorisation from './modules/authorisation'
import getToken from './modules/getToken'
import mockResults from './mocks/songs'

import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {
    const [results, setResults] = useState(mockResults)
    const [playlistName, setPlaylistName] = useState('New Playlist1')
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [accessToken, setAccessToken] = useState('')

    const onPlaylistNameChange = e => setPlaylistName(e.target.value)

    const onAdd = e => {
        const trackId = e.target.id
        const resultsList = results.tracks.items
        const trackToAdd = resultsList.filter(track => track.id === trackId)[0]

        setPlaylistTracks(prev => [trackToAdd, ...prev])
        setResults(prev => {
            let items = prev.tracks.items
            prev.tracks.items = items.filter(track => track.id !== trackId)
            return prev
        })
    }

    const onRemove = e => {
        const trackId = e.target.id
        const trackToRemove = playlistTracks.filter(track => track.id === trackId)[0]

        setResults(prev => [trackToRemove, ...prev])
        setPlaylistTracks(prev => prev.filter(track => track.id !== trackId))
    }

    useEffect(() => {
        if (window.location.pathname === "/callback") {
            if (!window.localStorage.access_token ||
                window.localStorage.access_token === 'undefined'
            ) {
                const generateToken = async () => await getToken(setAccessToken)
                generateToken()
            }
        } else if(window.localStorage.access_token ||
                window.localStorage.access_token !== 'undefined') {
            setAccessToken(window.localStorage.access_token)
        }
    }, [])

    // TODO: Delete this
    async function getProfile() {
        await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('profile info:')
            console.log(data)
        })
        .catch(e => console.error(e))
    }

    const onSave = async e => {
        e.preventDefault()

        // If already authorised
        if (accessToken) {
            getProfile()
        } else {
            await authorisation()
        }   
    }

    return (
        <>
            <Header />

            <main>
                <div className="bg"></div>
                <div className="container">
                    <SearchBar accessToken={accessToken} setResults={setResults} />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults data={results.tracks.items} onAdd={onAdd} />
                        </div>

                        <div className="column column--right">
                            <Playlist
                                playlistName={playlistName}
                                playlistTracks={playlistTracks}
                                onPlaylistNameChange={onPlaylistNameChange}
                                onSave={onSave}
                                onRemove={onRemove}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
