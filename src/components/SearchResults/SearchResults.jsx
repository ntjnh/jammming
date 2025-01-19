import React from 'react'
import TrackList from '../TrackList/TrackList'
import styles from './SearchResults.module.css'

export default function SearchResults({ data }) {
    return (
        <section className={styles.results}>
            <h2>Results</h2>

            <TrackList list="results" tracks={data} />
        </section>
    )
}
