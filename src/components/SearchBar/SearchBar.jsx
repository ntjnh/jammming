import Button from '../Button/Button'
import styles from './SearchBar.module.css'

export default function SearchBar({ onSubmit, searchRef }) {
    return (
        <section className={styles.search}>
            <form onSubmit={onSubmit} data-testid="search">
                <input
                    type="text"
                    name="search"
                    ref={searchRef}
                    placeholder="Enter a song title, album or artist"
                    required />

                <Button isActive={true} style="search" label="Search" />
            </form>
        </section>
    )
}
