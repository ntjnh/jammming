import React from 'react'
import './App.css'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Playlist from './components/Playlist'

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
