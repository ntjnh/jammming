import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('adds a track to the playlist', async () => {
    const screen = await render(<App initialResults={mockResults} />)

    const results = screen.getByTestId('search-results')
    const playlist = screen.getByTestId('playlist')
    const testResult = screen.getByTestId('results-california')

    // Check track appears in the results
    await expect.element(results).toContainElement(testResult)

    // Click to add to playlist
    const addButton = testResult.getByRole('button', {
        name: `Add California to playlist`
    })
    await userEvent.click(addButton)
    
    // Check the track is in the playlist
    const testPlaylistTrack = playlist.getByText('California', { exact: true })
    await expect.element(playlist).toContainElement(testPlaylistTrack)
})
