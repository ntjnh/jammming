import { render } from 'vitest-browser-react'
import { describe, expect, test } from 'vitest'
import App from '../../../src/App'

describe('Application renders', async () => {

    test('Header and footer components load', async () => {
        const { getByTestId, getByText } = await render(<App />)
    
        // Header with app title is visible
        await expect.element(getByText('Jammming')).toBeVisible()
    
        // Footer text is visible and link opens in a new tab
        await expect.element(getByTestId('footer')).toHaveTextContent('Built by')
        const nate = getByText('Nate')
        await expect.element(nate).toBeVisible()
        await expect.element(nate).toHaveAttribute('target', '_blank')
    })

    test('Search form loads', async () => {
        const { getByTestId } = await render(<App />)
        const search = getByTestId('search')
        const input = search.getByPlaceholder('Enter a song title, album or artist')
        const searchBtn = search.getByText('Search')
        
        await expect.element(search).toBeVisible()
        await expect.element(input).toBeVisible()
        await expect.element(searchBtn).toBeVisible()
    })

    test('Search results and playlist builder load', async () => {
        const { getByTestId } = await render(<App />)
        const results = getByTestId('search-results')
        const resultsHeading = results.getByTestId('results-heading')

        const playlist = getByTestId('playlist')
        const playlistName = playlist.getByPlaceholder('New Playlist')
        const saveBtn = playlist.getByText('Save to Spotify')

        // Search results
        await expect.element(results).toBeVisible()
        await expect.element(resultsHeading).toHaveTextContent('Results')
        await expect.element(results.getByText('Search results will appear here.')).toBeVisible()
        
        // Playlist builder
        await expect.element(playlist).toBeVisible()
        await expect.element(playlistName).toHaveValue('New Playlist 1')
        await expect.element(playlist.getByText('Add a track to start building your playlist.')).toBeVisible()
        await expect.element(saveBtn).toBeVisible()
    })
})    
