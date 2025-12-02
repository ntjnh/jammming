import { render } from 'vitest-browser-react'
import { describe, expect, test } from 'vitest'
import App from '../../../src/App'

describe('Search for a track', () => {
    test('Returning matching results', async () => {
        const { getByTestId } = await render(<App />)
        const searchForm = getByTestId('search')
        const results = getByTestId('search-results')

        // Get elements
        const searchInput = searchForm.getByRole('input')
        const button = searchForm.getByRole('button', { name: 'Search', exact: true })

        // Type search query into the text input
        await searchInput.fill('sultans')

        // Click on search
        await button.click()

        // Look for loading icon

        // Check if there are any results
            // ul.tracklist -> children length
        await expect.element(results).toContainElement()

        // Check results for matches to query
            // Loop through children and check if search term is contained in each track name string
        await expect.element(results).toContainElement(california)

        // Locate track in the search results
        // const californiaResult = results.getByTestId('results-california')

        // // Click on the track
        // await californiaResult.click()

        // // Locate the track in the playlist
        // const california = results.getByTestId('playlist-california')

        // // Locate the track in the playlist
        // await expect.element(results).toContainElement(california)
    })
})
