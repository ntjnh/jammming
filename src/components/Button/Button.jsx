import React from 'react'
import styles from './Button.module.css'

export default function Button({ style, label }) {
    return (
        <button className={`${styles.button} ${styles[style]}`} type="submit">
            {label}
        </button>
    )
}
