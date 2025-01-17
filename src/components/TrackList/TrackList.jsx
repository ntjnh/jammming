import React from 'react'
import Track from '../Track/Track'

export default function TrackList({ tracks }) {
    const tracksList = tracks.map((track, i) => {
        return (
            <Track
                key={`track-${i}`}
                title={track.title}
                artist={track.artist}
            />
        )
    })

    return (
        <ul>
            {tracksList}
        </ul>
    )
}
