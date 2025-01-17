import React from 'react'
import styles from './Track.module.css'

export default function Track({ title, artist, list }) {
    return (
        <li className={styles.track}>
            <h3 className={styles.title}>{title}</h3>
            <h4 className={styles.artist}>{artist}</h4>

            <button className={styles.toggle}>{list === 'results' ? '+' : '-'}</button>
        </li>
    )
}
