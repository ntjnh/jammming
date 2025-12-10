import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { expect, test, vi } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('creates and saves the playlist', async () => {
    const mockSave = vi.fn()
    const user = userEvent.setup()
    const { getByTestId } = await render(
        <App initialResults={mockResults} handleSave={mockSave} />
    )

    const results = getByTestId('search-results')
    const playlist = getByTestId('playlist')

    const testSong1 = {
        track: getByTestId('results-california'),
        title: 'California'
    }
    const testSong2 = {
        track: getByTestId('results-trainwreck'),
        title: 'Trainwreck'
    }
    const testSong3 = {
        track: getByTestId('results-adore-u'),
        title: 'Adore U'
    }
    const testSongs = [testSong1, testSong2, testSong3]

    // add songs to playlist
    testSongs.forEach(async ({ track, title }) => {
        await expect.element(results).toContainElement(track)

        const addButton = track.getByRole('button')
        await user.click(addButton)
        
        const trackName = playlist.getByText(title, { exact: true })
        await expect.element(playlist).toContainElement(trackName)
    })

    // enter a name for the playlist
    await user.fill(playlist.getByRole('textbox'), 'Vitest Playlist')

    // click save
    await user.click(playlist.getByRole('button', { name: 'Save to Spotify' }))

    expect(mockSave).toHaveBeenCalledOnce()
})
