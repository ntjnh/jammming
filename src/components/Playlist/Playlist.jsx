import Button from '../Button/Button'
import TrackList from '../TrackList/TrackList'
import styles from './Playlist.module.css'
import spinner from '../../assets/spinner.svg'

export default function Playlist({
    onPlaylistNameChange,
    playlistName,
    playlistRef,
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
                    placeholder="Name your playlist"
                    value={playlistName}
                    ref={playlistRef}
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
                    <div className={styles.success}>
                        <h3 className={styles.success}>
                            Your playlist
                            <span>{localStorage.getItem('playlist_name')}</span>
                            has been saved!
                        </h3>
                        <h4>
                            Search for more tracks to start creating another one!
                        </h4>
                    </div>
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
