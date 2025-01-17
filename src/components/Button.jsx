import React from 'react'

export default function Button({ style, label, type }) {
    return (
        <button className={style} type={type}>
            {label}
        </button>
    )
}
