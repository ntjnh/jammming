import { useEffect, useState } from 'react'
import './App.css'
import authenticate from './modules/authenticate'
import getAccessToken from './modules/getAccessToken'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

const mockResults = [
    {
        id: '0yi1bc2os',
        song: 'You & I',
        artist: 'Bru-C',
        album: 'Original Sounds',
        uri: 'https://spotify.com/track/arandomidorsomething/you-i'
    },
    {
        id: '3mi4ny5yg',
        song: 'Miss Independent',
        artist: 'Ne-Yo',
        album: 'Year of the Gentleman',
        uri: 'https://spotify.com/track/arandomidorsomething/miss-independent'
    },
    {
        id: '6au7kl8sc',
        song: 'Adore U',
        artist: 'Khalid',
        album: 'Sincere',
        uri: 'https://spotify.com/track/arandomidorsomething/adore-u'
    },
    {
        id: '9cf0bl1cf',
        song: 'California',
        artist: 'blink-182',
        album: 'California',
        uri: 'https://spotify.com/track/arandomidorsomething/california'
    },
    {
        id: '2ns3sf4ck',
        song: 'No Solution',
        artist: 'Sum 41',
        album: 'Chuck',
        uri: 'https://spotify.com/track/arandomidorsomething/no-solution'
    },
    {
        id: '5tw6nf7rs',
        song: 'Trainwreck',
        artist: 'New Found Glory',
        album: 'Radiosurgery',
        uri: 'https://spotify.com/track/arandomidorsomething/trainwreck'
    },
    {
        id: '8ss9ds0ds',
        song: 'Sultans of Swing',
        artist: 'Dire Straits',
        album: 'Dire Straits',
        uri: 'https://spotify.com/track/arandomidorsomething/sultans-of-swing'
    },
    {
        id: '1ne2bc3fo',
        song: 'No Excuses',
        artist: 'Bru-C',
        album: 'Family Only',
        uri: 'https://spotify.com/track/arandomidorsomething/no-excuses'
    },
    {
        id: '4al5ny6al',
        song: 'Another Love Song',
        artist: 'Ne-Yo',
        album: 'Another Love Song',
        uri: 'https://spotify.com/track/arandomidorsomething/another-love-song'
    },
    {
        id: '7ew8kl9sc',
        song: 'Everything We See',
        artist: 'Khalid',
        album: 'Sincere',
        uri: 'https://spotify.com/track/arandomidorsomething/everything-we-see'
    }
]

function App() {
    const [results, setResults] = useState(mockResults)
    const [playlistName, setPlaylistName] = useState('New Playlist1')
    const [playlistTracks, setPlaylistTracks] = useState([])
    const [playlistUris, setPlaylistUris] = useState([])
    const [accessToken, setAccessToken] = useState('')

    const onPlaylistNameChange = e => setPlaylistName(e.target.value)

    const onAdd = e => {
        const trackId = e.target.id
        const trackToAdd = results.filter(track => track.id === trackId)[0]

        setPlaylistTracks(prev => [trackToAdd, ...prev])
        setResults(prev => prev.filter(track => track.id !== trackId))
    }

    const onRemove = e => {
        const trackId = e.target.id
        const trackToRemove = playlistTracks.filter(track => track.id === trackId)[0]

        setResults(prev => [trackToRemove, ...prev])
        setPlaylistTracks(prev => prev.filter(track => track.id !== trackId))
    }

    // const onLogin = () => {
    //     authenticate()
    // }

    useEffect(() => {
        if (window.location.pathname === "/callback") {
            const hash = window.location.hash
    
            getAccessToken(hash, setAccessToken)
        }
    }, [])

    const onSave = e => {
        e.preventDefault()

        authenticate()

        // If user is logged into their Spotify account
        if (accessToken) {

            // const uris = []
            // playlistTracks.forEach(track => uris.push(track.uri))
            // setPlaylistUris(() => [uris])
            
            // // Reset existing playlist
            // setPlaylistTracks(() => [])
    
            // playlistName and playlistUris to be sent to spotify

        } else {
            // direct user to go and login and authorise
        }   
    }

    return (
        <>
            <Header />

            <main>
                <div className="bg"></div>
                <div className="container">
                    <SearchBar />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults data={results} onAdd={onAdd} />
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
