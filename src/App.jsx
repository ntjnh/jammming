import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import SearchBar from './components/SearchBar/SearchBar'
import SearchResults from './components/SearchResults/SearchResults'
import Playlist from './components/Playlist/Playlist'

function App() {
    return (
        <>
            <Header />

            <main>
                <div className="container">
                    <SearchBar />

                    <div className="columns">
                        <div className="column column--left">
                            <SearchResults />
                        </div>

                        <div className="column column--right">
                            <Playlist />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
