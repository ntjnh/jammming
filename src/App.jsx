import { useState } from 'react'
import './App.css'
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
        saved: false
    },
    {
        id: '3mi4ny5yg',
        song: 'Miss Independent',
        artist: 'Ne-Yo',
        album: 'Year of the Gentleman',
        saved: false
    },
    {
        id: '6au7kl8sc',
        song: 'Adore U',
        artist: 'Khalid',
        album: 'Sincere',
        saved: false
    },
    {
        id: '9cf0bl1cf',
        song: 'California',
        artist: 'blink-182',
        album: 'California',
        saved: false
    },
    {
        id: '2ns3sf4ck',
        song: 'No Solution',
        artist: 'Sum 41',
        album: 'Chuck',
        saved: false
    },
    {
        id: '5tw6nf7rs',
        song: 'Trainwreck',
        artist: 'New Found Glory',
        album: 'Radiosurgery',
        saved: false
    },
    {
        id: '8ss9ds0ds',
        song: 'Sultans of Swing',
        artist: 'Dire Straits',
        album: 'Dire Straits',
        saved: false
    },
    {
        id: '1ne2bc3fo',
        song: 'No Excuses',
        artist: 'Bru-C',
        album: 'Family Only',
        saved: true
    },
    {
        id: '4al5ny6al',
        song: 'Another Love Song',
        artist: 'Ne-Yo',
        album: 'Another Love Song',
        saved: true
    },
    {
        id: '7ew8kl9sc',
        song: 'Everything We See',
        artist: 'Khalid',
        album: 'Sincere',
        saved: true
    }
]


function App() {
    const [results, setResults] = useState(mockResults)

    return (
        <>
            <Header />

            <main>
                <div className="bg"></div>
                <div className="container">
                    <SearchBar />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults data={results} add={setResults} />
                        </div>

                        <div className="column column--right">
                            <Playlist data={results} remove={setResults} />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
