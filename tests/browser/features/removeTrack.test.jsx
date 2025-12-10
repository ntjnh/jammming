import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('removes a track from the playlist', async () => {
    const user = userEvent.setup()
    const song = 'California'
    
    const { getByTestId } = await render(<App initialResults={mockResults} />)
    const results = getByTestId('search-results')
    const playlist = getByTestId('playlist')
    
    // Add to playlist
    const testResult = results.getByTestId('results-california')
    const addButton = testResult.getByRole('button', { name: `Add ${song}` })
    await user.click(addButton)

    // Locate track in the playlist
    const testPlaylistTrack = getByTestId('playlist-california')

    // Click to remove from playlist
    const removeButton = testPlaylistTrack.getByRole('button', { name: `Remove ${song}` })
    await user.click(removeButton)

    // Check track is no longer in the playlist
    await expect.poll(() => 
        expect.element(playlist.queryByTestId('playlist-california')).toBeNull())
})
