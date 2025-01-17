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
                <div>
                    <SearchBar />

                    <div>
                        <div>
                            <SearchResults />
                        </div>

                        <div>
                            <Playlist />
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default App
