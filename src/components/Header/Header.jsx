import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header} data-testid="header">
            <h1>Ja<span>mmm</span>ing</h1>
        </header>
    )
}
