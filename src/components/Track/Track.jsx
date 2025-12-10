import styles from './Track.module.css'

export default function Track({
    trackId,
    trackIdx,
    song,
    artist,
    album,
    list,
    onAdd,
    onRemove,
    testid
}) {
    const handleClick = e => {
        list === 'results' ? onAdd(e) : onRemove(e)
    }

    const ariaLabel = list === 'results' ?
        `Add ${song} to playlist` : `Remove ${song} from playlist`

    return (
        <li className={styles.track} data-testid={testid}>
            <h3 className={styles.song}>{song}</h3>
            <h4 className={styles.artist}>
                {artist} <span className={styles.divider}>|</span> {album}
            </h4>

            <button
                className={styles.toggle}
                onClick={handleClick}
                id={trackId}
                data-idx={trackIdx}
                type="button"
                aria-label={ariaLabel}
            >
                {list === 'results' ? '+' : '-'}
            </button>
        </li>
    )
}
