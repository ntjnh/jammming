import React from 'react'
import TrackList from '../TrackList/TrackList'
import styles from './SearchResults.module.css'

export default function SearchResults({ data, onAdd }) {
    return (
        <section className={styles.results}>
            <h2>Results</h2>

            <TrackList onAdd={onAdd} list="results" tracks={data} />
        </section>
    )
}
