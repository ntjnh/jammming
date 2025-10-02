import styles from './Track.module.css'

export default function Track({ trackId, song, artist, album, list, onAdd, onRemove }) {
    const handleClick = e => {
        if (list === 'results') {
            onAdd(e)
        } else {
            onRemove(e)
        }
    }

    return (
        <li className={styles.track}>
            <h3 className={styles.song}>{song}</h3>
            <h4 className={styles.artist}>{artist} <span className={styles.divider}>|</span> {album}</h4>

            <button
                className={styles.toggle}
                onClick={handleClick}
                id={trackId}
                type="button"
            >
                {list === 'results' ? '+' : '-'}
            </button>
        </li>
    )
}
