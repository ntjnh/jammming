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

    if (playlistTracks.length > 1) {
        console.log('playlist:')
        console.log(playlistTracks.map(track => track.name))
    }

    return (
        <section className={styles.playlist} data-testid="playlist">
            <form onSubmit={onSave}>
                <input
                    onChange={onPlaylistNameChange}
                    type="text"
                    name="playlistName"
                    id="playlistName"
                    placeholder="New Playlist"
                    value={playlistName}
                />

                {playlistTracks.length > 0 ? (
                    <TrackList
                        list="playlist"
                        tracks={playlistTracks}
                        onRemove={onRemove}
                    />
                ) : (
                    <h3>Add a track to start building your playlist.</h3>
                )}

                <Button
                    style="save"
                    label="Save to Spotify"
                />
            </form>
        </section>
    )

}
