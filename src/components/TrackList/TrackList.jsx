import Track from '../Track/Track'
import styles from './TrackList.module.css'

export default function TrackList({ tracks, list, onAdd, onRemove }) {
    const tracksList = tracks.map((track, idx) => {
        const plTrackId = `${track.id}-${idx}`
        const trackId = list === 'playlist' ? plTrackId : track.id
        const trackIdx = list === 'playlist' ? idx : null

        const trackTestId = track.name.toLowerCase().replaceAll(' ', '-')
        const testId = 
            (trackTestId === 'california' || 
            trackTestId === 'trainwreck' || 
            trackTestId === 'adore-u') ?
                `${list}-${trackTestId}` : null


        return (
            <Track
                key={idx}
                trackId={trackId}
                trackIdx={trackIdx}
                song={track.name}
                artist={track.artists[0].name}
                album={track.album.name}
                list={list}
                onAdd={onAdd}
                onRemove={onRemove}
                testid={testId}
            />
        )
    })

    return (
        <ul className={styles.tracklist}>
            {tracksList}
        </ul>
    )
}
