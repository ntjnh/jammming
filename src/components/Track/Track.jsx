import React from 'react'
import styles from './Track.module.css'

export default function Track({ song, artist, list }) {
    return (
        <li className={styles.track}>
            <h3 className={styles.song}>{song}</h3>
            <h4 className={styles.artist}>{artist}</h4>

            <button className={styles.toggle}>{list === 'results' ? '+' : '-'}</button>
        </li>
    )
}
