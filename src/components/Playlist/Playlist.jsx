import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'
import spinner from '../../assets/spinner.svg'

export default function Playlist({
    playlistName,
    onPlaylistNameChange,
    playlistTracks,
    saved,
    saving,
    onRemove,
    onSave
}) {

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

                {saving ? <img className="spinner" src={spinner} /> :
                    <TrackList
                        list="playlist"
                        tracks={playlistTracks}
                        onRemove={onRemove}
                    />
                }

                {(!playlistTracks.length && !saved) &&
                    <h3 className={styles.placeholder}>
                        Add a track to start building your playlist.
                    </h3>
                }

                {(saved && !playlistTracks.length) && 
                    <h3 className={styles.success}>
                        Your playlist has been saved!<br />
                        Search for more tracks to start creating another one!
                    </h3>
                }

                <Button
                    isActive={playlistTracks.length > 0}
                    style="save"
                    label="Save to Spotify"
                />
            </form>
        </section>
    )
}
