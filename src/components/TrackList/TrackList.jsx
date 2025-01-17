import React from 'react'
import Track from '../Track/Track'
import styles from './TrackList.module.css'

export default function TrackList({ tracks, list }) {
    const tracksList = tracks.map((track, i) => {
        return (
            <Track
                key={`track-${i}`}
                title={track.title}
                artist={track.artist}
                list={list}
            />
        )
    })

    return (
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
