import React from 'react'

export default function Track({ title, artist }) {
    return (
        <div>
            <h3>{title}</h3>
            <h4>{artist}</h4>
        </div>
    )
}
