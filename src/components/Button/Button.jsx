import React from 'react'
import styles from './Button.module.css'

export default function Button({ style, label, type }) {
    return (
        <button className={`${styles.button} ${styles[style]}`} type={type}>
            {label}
        </button>
    )
}
