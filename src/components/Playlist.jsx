import React from 'react'
import Button from './Button'
import TrackList from './TrackList'

export default function Playlist() {
    const toSave = [
        {
            title: 'No Excuses',
            artist: 'Bru-C'
        },
        {
            title: 'Another Love Song',
            artist: 'Ne-Yo'
        },
        {
            title: 'Everything We See',
            artist: 'Khalid'
        }
    ]

    return (
        <section>
            <input type="text" name="playlistTitle" id="playlistTitle" value="New Playlist" />

            <TrackList tracks={toSave} />

            <Button
                style="save"
                type="button"
                label="Save to Spotify"
            />
        </section>
    )
}
