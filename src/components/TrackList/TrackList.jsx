import React from 'react'
import Track from '../Track/Track'
import styles from './TrackList.module.css'

export default function TrackList({ tracks, list, onAdd, onRemove }) {
    const tracksList = tracks.map(track => {
        return (
            <Track
                key={track.id}
                trackId={track.id}
                song={track.song}
                artist={track.artist}
                album={track.album}
                list={list}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        )
    })

    return (
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
