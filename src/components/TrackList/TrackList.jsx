import React from 'react'
import Track from '../Track/Track'
import styles from './TrackList.module.css'

export default function TrackList({ tracks, list, removeTrack }) {
    const tracksList = tracks.map(track => {
        return (
            <Track
                key={track.id}
                song={track.song}
                artist={track.artist}
                album={track.album}
                list={list}
                removeTrack={removeTrack}
            />
        )
    })

    return (
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
