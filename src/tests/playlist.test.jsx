import { render } from 'vitest-browser-react'
import { describe, expect, test } from 'vitest'
import App from '../App'

describe('Playlist', async () => {
    test('Add to playlist', async () => {
        const { getByTestId, getByText } = await render(<App />)
        const results = getByTestId('search-results')
        const playlist = getByTestId('playlist')

        // Locate a track in the search results
        // Click on its Add button
        // Locate the track in the playlist
    })
    
    test('Remove from playlist', async () => {
        const { getByTestId, getByText } = await render(<App />)
        const results = getByTestId('search-results')
        const playlist = getByTestId('playlist')

        // Remove from playlist
        // Locate a track in the playlist
        // Click on its Remove button
        // Make sure the track is no longer in the playlist
    })
})
