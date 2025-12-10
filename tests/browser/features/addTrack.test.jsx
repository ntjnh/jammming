import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('adds a track to the playlist', async () => {
    const user = userEvent.setup()
    const { getByTestId } = await render(<App initialResults={mockResults} />)

    const results = getByTestId('search-results')
    const playlist = getByTestId('playlist')
    const testResult = getByTestId('results-california')

    // Check track appears in the results
    await expect.element(results).toContainElement(testResult)

    // Click to add to playlist
    const addButton = testResult.getByRole('button', { name: `Add California` })
    await user.click(addButton)
    
    // Check the track is in the playlist
    const testPlaylistTrack = playlist.getByText('California', { exact: true })
    await expect.element(playlist).toContainElement(testPlaylistTrack)
})
