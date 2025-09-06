import Button from '../Button/Button'
import styles from './SearchBar.module.css'

export default function SearchBar() {
    return (
        <section className={styles.search}>
            <form>
                <input type="text" name="song" id="song" placeholder="Enter a song title" />

                <Button
                    style="search"
                    label="Search"
                />
            </form>
        </section>
    )
}
