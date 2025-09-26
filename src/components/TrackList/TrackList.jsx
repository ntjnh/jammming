import Track from '../Track/Track'
import styles from './TrackList.module.css'

export default function TrackList({ tracks, list, onAdd, onRemove }) {
    const tracksList = tracks.map(track => {
        return (
            <Track
                key={track.id}
                trackId={track.id}
                song={track.name}
                artist={track.artists[0].name}
                album={track.album.name}
                list={list}
                onAdd={onAdd}
                onRemove={onRemove}
            />
        )
    })

    return (
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
