import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'

export default function Playlist({
    playlistName,
    onPlaylistNameChange,
    playlistTracks,
    onRemove,
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
                    onRemove={onRemove}
                />

                <Button
                    style="save"
                    label="Save to Spotify"
                />
            </form>
        </section>
    )

}
