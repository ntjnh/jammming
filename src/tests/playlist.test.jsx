import { render } from 'vitest-browser-react'
import { describe, expect, test } from 'vitest'
import App from '../App'

describe('Playlist', async () => {
    test('Add to playlist', async () => {
        const { getByTestId } = await render(<App />)
        const results = getByTestId('search-results')
        const playlist = getByTestId('playlist')

        // Locate track in the search results
        const californiaResult = results.getByTestId('results-california')

        // Click on the track
        await californiaResult.click()

        // Locate the track in the playlist
        const california = playlist.getByTestId('playlist-california')

        // Locate the track in the playlist
        await expect.element(playlist).toContainElement(california)
    })
    
    test('Remove from playlist', async () => {
        const { getByTestId } = await render(<App />)
        const results = getByTestId('search-results')
        const playlist = getByTestId('playlist')

        // Locate track in the search results
        const californiaResult = results.getByTestId('results-california')

        // Click on the track
        await californiaResult.click()

        // Locate track in the playlist
        const california = playlist.getByTestId('playlist-california')

        // Click on its Remove button
        await california.click()

        // Make sure the track is no longer in the playlist
        await expect.poll(() => expect.element(playlist).not.toContainElement(california))
    })
})
