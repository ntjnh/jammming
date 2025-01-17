import React from 'react'
import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'

export default function Playlist() {
    const toSave = [
        {
            title: 'No Excuses',
            artist: 'Bru-C'
        },
        {
            title: 'Another Love Song',
            artist: 'Ne-Yo'
        },
        {
            title: 'Everything We See',
            artist: 'Khalid'
        }
    ]

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
