import React from 'react'
import TrackList from './TrackList'

export default function SearchResults() {
    const results = [
        {
            title: 'You & I',
            artist: 'Bru-C'
        },
        {
            title: 'Miss Independent',
            artist: 'Ne-Yo'
        },
        {
            title: 'Adore U',
            artist: 'Khalid'
        },
        {
            title: 'California',
            artist: 'blink-182'
        },
        {
            title: 'No Solution',
            artist: 'Sum 41'
        },
        {
            title: 'Trainwreck',
            artist: 'New Found Glory'
        },
        {
            title: 'Sultans of Swing',
            artist: 'Dire Straits'
        },
    ]
        
    return (
        <section>
            <h2>Results</h2>

            <TrackList tracks={results} />
        </section>
    )
}
