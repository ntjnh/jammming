import React from 'react'
import Track from '../Track/Track'
import styles from './TrackList.module.css'

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
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
