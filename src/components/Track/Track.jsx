import React from 'react'
import styles from './Track.module.css'

export default function Track({ song, artist, album, list, removeTrack }) {
    return (
        <li className={styles.track}>
            <h3 className={styles.song}>{song}</h3>
            <h4 className={styles.artist}>{artist} <span className={styles.divider}>|</span> {album}</h4>

            <button
                className={styles.toggle}
                onClick={() => removeTrack}
            >
                {list === 'results' ? '+' : '-'}
            </button>
        </li>
    )
}
