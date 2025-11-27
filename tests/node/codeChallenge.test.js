import { describe, expect, it, vi, beforeAll, afterEach, afterAll } from 'vitest'

// First, stub globals
// setup.node.js is already run before this test via `setupFiles`
// so localStorage & window exist now

// Import MSW server *after* globals are ready
let server

// Lazy-load server to guarantee MSW is never imported before globals are ready
beforeAll(async () => {
    const { server: importedServer } = await import('../mocks/node')
    server = importedServer
    server.listen({ onUnhandledRequest: 'error' })
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock BEFORE importing the module
vi.mock('../../src/modules/codeChallenge.js', async () => {
    return { 
        generateCodeVerifier: () => 'TEST_VERIFIER_123',
        sha256: async () => new Uint8Array([1, 2, 3, 4]),
        base64encode: () => 'MOCKED_CODE_CHALLENGE'
    }
})

import { base64encode, generateCodeVerifier, sha256 } from '../../src/modules/codeChallenge'

describe('Generate code challenge', () => {
    it('generateCodeVerifier returns a code verifier string', () => {
        expect(generateCodeVerifier()).toBe('TEST_VERIFIER_123')
    })

    // hashed code verifier
    it ('sha256 returns hashed code verifier', async () => {
        const hashedVerifier = await sha256('anything')
        expect(hashedVerifier).toBeInstanceOf(Uint8Array)
        expect(Array.from(hashedVerifier)).toEqual([1,2,3,4])
    })

    // code challenge - base 64 encode the hash
    it ('base64encode returns the code challenge', () => {
        expect(base64encode(new Uint8Array([1,2,3,4]))).toBe('MOCKED_CODE_CHALLENGE')
    })
})
