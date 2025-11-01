import styles from './Button.module.css'

export default function Button({ style, label, isActive }) {
    return (
        <button
            className={`${styles.button} ${styles[style]} ${!isActive ? styles.disabled : ''}`}
            type="submit"
            disabled={!isActive}
        >
            {label}
        </button>
    )
}
