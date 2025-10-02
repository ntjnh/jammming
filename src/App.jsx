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
    const [userId, setUserId] = useState('')
    const [playlistId, setPlaylistId] = useState('5gmW1T3ASErqz81nnhpg9N')
    const [playlistToSave, setPlaylistToSave] = useState([])

    const onPlaylistNameChange = e => setPlaylistName(e.target.value)

    const onAdd = e => {
        const trackId = e.target.id
        const resultsList = results.tracks.items
        const trackToAdd = resultsList.filter(track => track.id === trackId)[0]

        setPlaylistTracks(prev => [trackToAdd, ...prev])
    }

    const onRemove = e => {
        const trackId = e.target.id

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
            // console.log('profile info:')
            // console.log(data)
            setUserId(data.id)
        })
        .catch(e => console.error(e))
    }

    const onSave = async e => {
        e.preventDefault()

        // If already authorised
        if (accessToken) {
            getProfile()

            // if (userId) {

            //     try {
            //         const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`
        
            //         const test_count = Number(window.localStorage.getItem('jammming_test_count'))
            //         let newCount = test_count + 1
    
            //         window.localStorage.setItem('jammming_test_count', newCount)
    
            //         await fetch(createPlaylistEndpoint, {
            //             method: 'POST',
            //             body: JSON.stringify({
            //                 name: playlistName,
            //                 description: `Made by the jammming web app - test ${newCount}`,
            //                 public: false
            //             }),
            //             headers: {
            //                 Authorization: 'Bearer ' + accessToken,
            //                 'Content-Type': 'application/json'
            //             }
            //         })
            //         .then(res => {
            //             if (!res.ok) {
            //                 throw new Error(`HTTP error! Status: ${res.status}`);
            //             }

            //             return res.json()
            //         })
            //         .then(data => console.log(data))
            //     } catch (e) {
            //         console.error(`Error: ${e}`)
            //     }
            // }

            if (playlistId) {
                setPlaylistToSave(playlistTracks.map(track => track.uri))
    
                const addToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`

                try {
                    await fetch(addToPlaylistEndpoint, {
                        method: 'POST',
                        body: JSON.stringify({
                            uris: playlistToSave
                        }),
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {
                        if (!res.ok) {
                            console.log(res)
                            throw new Error(`HTTP Error: Status ${res.status}`);
                        }

                        return res.json()
                    })
                    .then(data => console.log(data))
                } catch (e) {
                    console.error(`${e.message}`)
                }
            }

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
