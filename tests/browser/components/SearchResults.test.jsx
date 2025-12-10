import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import App from '../../../src/App'
import mockResults from '../../mocks/songs'

test('loads results', async () => {
    const { getByTestId } = await render(<App initialResults={mockResults} />)
    const results = getByTestId('search-results')
    const songInResults = results.getByText('California', { exact: true })
    await expect.element(songInResults).toBeInTheDocument()
})
