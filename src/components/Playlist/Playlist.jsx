import React from 'react'
import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'

export default function Playlist({
    playlistName,
    onPlaylistNameChange,
    playlistTracks,
    removeTrack,
    returnTrackToResults,
    onSave
}) {

    return (
        <section className={styles.playlist}>
            <form onSubmit={onSave}>
                <input
                    onChange={onPlaylistNameChange}
                    type="text"
                    name="playlistName"
                    id="playlistName"
                    placeholder="New Playlist"
                    value={playlistName}
                />

                <TrackList
                    list="playlist"
                    tracks={playlistTracks}
                    removeTrack={removeTrack}
                    returnTrackToResults={returnTrackToResults}
                />

                <Button
                    style="save"
                    label="Save to Spotify"
                />
            </form>
        </section>
    )

}
