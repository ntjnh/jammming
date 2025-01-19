import React from 'react'
import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'

export default function Playlist({ data }) {
    const toSave = data.filter(track => track.saved)

    return (
        <section className={styles.playlist}>
            <input type="text" name="playlistTitle" id="playlistTitle" placeholder="New Playlist" />

            <TrackList list="playlist" tracks={toSave} />

            <Button
                style="save"
                type="button"
                label="Save to Spotify"
            />
        </section>
    )
}
