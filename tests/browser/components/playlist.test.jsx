import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { beforeEach, describe, expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

describe('Playlist interactions', () => {
    let results, playlist
    const song = 'California'

    beforeEach(async () => {
        const app = await render(<App initialResults={mockResults} />)

        results = app.getByTestId('search-results')
        playlist = app.getByTestId('playlist')
    })

    test('loads results', async () => {
        const songInResults = results.getByText(song, { exact: true })
        await expect.element(songInResults).toBeInTheDocument()
    })

    test('adds a track to the playlist', async () => {
        const user = userEvent.setup()
        const testResult = results.getByTestId('results-california')

        // Check track appears in the results
        await expect.element(results).toContainElement(testResult)

        const addButton = testResult.getByRole('button', { name: `Add ${song}` })

        // Click to add to playlist
        await user.click(addButton)
        
        // Check the track is in the playlist
        const testPlaylistTrack = playlist.getByText(song, { exact: true })
        await expect.element(playlist).toContainElement(testPlaylistTrack)
    })

    test('removes a track from the playlist', async () => {
        const user = userEvent.setup()

        // Add to playlist
        const testResult = results.getByTestId('results-california')
        const addButton = testResult.getByRole('button', { name: `Add ${song}` })
        await user.click(addButton)

        // Locate track in the playlist
        const testPlaylistTrack = playlist.getByTestId('playlist-california')

        // Click to remove from playlist
        const removeButton = testPlaylistTrack.getByRole('button', { name: `Remove ${song}` })
        await user.click(removeButton)

        // Check track is no longer in the playlist
        await expect.poll(() => expect.element(playlist.queryByTestId('playlist-california')).toBeNull())
    })
})
