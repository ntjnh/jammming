import { render } from 'vitest-browser-react'
import { userEvent } from 'vitest/browser'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('Returns matching results', async () => {
    const searchHandler = (searchRef, setResults) => {
        return e => {
            e.preventDefault()
            const query = searchRef.current.value.toLowerCase()

            setResults(prev => {
                prev.tracks.items = prev.tracks.items
                    .filter(t => t.name.toLowerCase().includes(query))
                return prev
            })
        }
    }

    const screen = await render(
        <App
            handleSearch={(e, searchRef, setResults) => 
                searchHandler(e, searchRef, setResults)}
            initialResults={mockResults} />
    )

    // Get elements
    const searchForm = screen.getByTestId('search')
    const results = screen.getByTestId('search-results')
    const searchInput = searchForm.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Search' })

    // Type in query and click Search
    await userEvent.type(searchInput, 'no')
    await userEvent.click(button)

    // Check for the expected results
    const expectedResults = ['No Solution', 'No Excuses', 'Another Love Song']

    expectedResults.forEach(async r => {
        await expect.element(
            results.getByText(r, { exact: true })
        ).toBeInTheDocument()
    })
})
