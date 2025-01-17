import React from 'react'
import styles from './Track.module.css'

export default function Track({ title, artist }) {
    return (
        <div className={styles.track}>
            <h3>{title}</h3>
            <h4>{artist}</h4>
        </div>
    )
}
