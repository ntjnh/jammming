import { render } from 'vitest-browser-react'
import { userEvent } from '@vitest/browser/context'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('Returns matching results', async () => {
    const user = userEvent.setup()

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

    const { getByRole, getByTestId } = render(
        <App
            handleSearch={(e, searchRef, setResults) => 
                searchHandler(e, searchRef, setResults)}
            initialResults={mockResults} />
    )

    // Get elements
    const searchForm = getByTestId('search')
    const results = getByTestId('search-results')
    const searchInput = searchForm.getByRole('textbox')
    const button = getByRole('button', { name: 'Search' })

    // Type in query and click Search
    await user.type(searchInput, 'no')
    await user.click(button)

    // Check for the expected results
    const expectedResults = ['No Solution', 'No Excuses', 'Another Love Song']

    expectedResults.forEach(async r => {
        await expect.element(
            results.getByText(r, { exact: true })
        ).toBeInTheDocument()
    })
})
