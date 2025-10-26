import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer} data-testid="footer">Built by <a
            href="https://nate-dev.com/?utm_source=codebynate&utm_medium=web&utm_campaign=jammming"
            target="_blank"
            rel="noopener">Nate</a>.
        </footer>
    )
}
