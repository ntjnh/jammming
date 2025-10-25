import { useEffect, useState } from 'react'
import './App.css'

import authentication from './modules/authentication'
import getRefreshToken from './modules/getRefreshToken'
import getToken from './modules/getToken'

import mockResults from './mocks/songs'

import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {
    const [results, setResults] = useState(mockResults)
    const [playlistName, setPlaylistName] = useState('New Playlist 1')
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [accessToken, setAccessToken] = useState('')
    const [validateAccessToken, setValidateAccessToken] = useState('')
    const [playlistToSave, setPlaylistToSave] = useState([])
    const [playlistSaved, setPlaylistSaved] = useState(false)

    const onPlaylistNameChange = e => setPlaylistName(e.target.value)


    const onAdd = e => {
        const trackId = e.target.id
        const resultsList = results.tracks.items
        const trackToAdd = resultsList.filter(track => track.id === trackId)[0]

        setPlaylistTracks([...playlistTracks, trackToAdd])
        setPlaylistToSave([...playlistToSave, trackToAdd.uri])

        console.log('playlist uris:')
        console.log(playlistToSave)
    }

    const onRemove = e => {
        const trackId = e.target.id

        setPlaylistTracks(prev => prev.filter(track => track.id !== trackId))
        setPlaylistToSave(prev => prev.filter(track => !track.includes(trackId)))
    }


    useEffect(() => {
        const storedToken = window.localStorage.access_token

        if (window.location.pathname === '/callback') {
            if (!storedToken || storedToken.length < 50) {
                const generateToken = async () => await getToken(setAccessToken)
                generateToken()
            }
        } else if (storedToken && storedToken.length > 50) {
            setAccessToken(storedToken)
        }
        
        if (localStorage.getItem('tokenExpired') === 'true') {
            const refreshToken = async () => await getRefreshToken(setAccessToken)
            refreshToken()
        }
    }, [])

    const authorise = async () => {
        if (accessToken) {
            getProfile()
        } else if (!accessToken) {
            await authentication()
            getProfile()
        }
        return true
        // refresh token?
    }

    // TODO: Delete this
    async function getProfile() {
        await fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                const errorStatus = data.error.status
                const errorMessage = data.error.message

                console.log(`HTTP Error ${errorStatus}: ${errorMessage}`)

                if (errorMessage.includes('access token expired')) {
                    setValidateAccessToken(errorStatus)
                    localStorage.setItem('tokenExpired', true)
                    localStorage.setItem('user_id', '')
                }
            } else {
                // console.log('profile info:')
                // console.log(data)
                localStorage.setItem('user_id', data.id)
            }
        })
        .catch(e => console.error(e))
    }

    const onSave = async e => {
        e.preventDefault()

        // If already authorised
        if (authorise()) {
            const createPlaylist = async () => {
                try {
                    const createPlaylistEndpoint = `https://api.spotify.com/v1/users/${localStorage.getItem('user_id')}/playlists`
    
                    await fetch(createPlaylistEndpoint, {
                        method: 'POST',
                        body: JSON.stringify({
                            name: playlistName,
                            description: `${playlistName} playlist (Created by Jammming)`,
                            public: false
                        }),
                        headers: {
                            Authorization: 'Bearer ' + accessToken,
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(res => {
                        // if (!res.ok) {
                        //     console.log(`Create playlist request (error):`)
                        //     console.log(res)
                        //     throw new Error(`HTTP error! Status: ${res.status}`);
                        // }
                        console.log(`Create playlist request...`)
                        return res.json()
                    })
                    .then(async data => {
                        if (data.error) {
                            const errorStatus = data.error.status
                            const errorMessage = data.error.message

                            console.log(`HTTP Error ${errorStatus}: ${errorMessage}`)

                            if (errorMessage.includes('access token expired')) {
                                setValidateAccessToken(errorStatus)
                                localStorage.setItem('tokenExpired', true)
                                localStorage.setItem('user_id', '')
                            }
                        } else {
                            console.log(`Playlist created!`)
                            // setPlaylistId(data.id) // save in localStorage
                            localStorage.setItem('playlist_id', data.id)

                            await savePlaylist(localStorage.getItem('playlist_id'))
                        }
                    })
                } catch (e) {
                    console.error(`Error: ${e}`)
                }
            }

            const savePlaylist = async id => {
                // setPlaylistToSave(playlistTracks.map(track => track.uri))
                console.log('playlist to save')
                console.log(playlistToSave)
    
                const addToPlaylistEndpoint = `https://api.spotify.com/v1/playlists/${id}/tracks`

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
                        console.log(`Save playlist request...`)
                        // if (!res.ok) {
                        //     console.log(res)
                        //     throw new Error(`HTTP Error: Status ${res.status}`);
                        // }
                        
                        return res.json()
                    })
                    .then(data => {

                        if (data.error) {
                            const errorStatus = data.error.status
                            const errorMessage = data.error.message

                            console.log(`HTTP Error ${errorStatus}: ${errorMessage}`)

                            if (errorMessage.includes('access token expired')) {
                                setValidateAccessToken(errorStatus)
                                localStorage.setItem('tokenExpired', true)
                            }
                        }
                        
                        if (data.snapshot_id) {
                            setPlaylistSaved(true)
                            playlistSaved && console.log(`Playlist saved!`)
                            setPlaylistName('')
                            setPlaylistToSave([])
                            setPlaylistTracks([])
                            console.log(data)
                        }
                    })
                } catch (e) {
                    console.error(`${e.message}`)
                }

                // setPlaylistName()
                // setPlaylistTracks()
            }

            await createPlaylist()
            
        }  
    }

    return (
        <>
            <Header />

            <main>
                <div className="bg"></div>
                <div className="container">
                    <SearchBar
                        accessToken={accessToken}
                        getProfile={getProfile}
                        setValidateAccessToken={setValidateAccessToken}
                        setResults={setResults}
                        validateAccessToken={validateAccessToken} />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults
                                data={results.tracks.items}
                                onAdd={onAdd}
                                setPlaylistTracks={setPlaylistTracks} />
                        </div>

                        <div className="column column--right">
                            <Playlist
                                playlistName={playlistName}
                                playlistTracks={playlistTracks}
                                setPlaylistTracks={setPlaylistTracks}
                                onPlaylistNameChange={onPlaylistNameChange}
                                onSave={onSave}
                                onRemove={onRemove}
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
