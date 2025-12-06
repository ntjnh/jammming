import { describe, it, expect, vi, beforeAll } from 'vitest'

// Mock PKCE module BEFORE importing authentication
vi.mock('../../src/features/auth/codeChallenge.js', async () => {
    return {
        generateCodeVerifier: () => 'TEST_VERIFIER_123',
        // deterministic fake hash
        sha256: async () => new Uint8Array([1, 2, 3, 4]),
        base64encode: () => 'MOCKED_CODE_CHALLENGE',
    }
})

// Stub window globals (already done in setup.node.js if using setupFiles)
const localStorageMock = {
    store: {},
    getItem(key) {
        return this.store[key] ?? null
    },
    setItem(key, value) {
        this.store[key] = value.toString()
    },
    removeItem(key) {
        delete this.store[key]
    },
    clear() {
        this.store = {}
    }
}

vi.stubGlobal('localStorage', localStorageMock)
vi.stubGlobal('window', {
    localStorage: localStorageMock,
    location: {
        search: '',
        href: ''
    }
})

// Import module AFTER mocks
import authentication from '../../src/features/auth/authentication'
import * as codeChallenge from '../../src/features/auth/codeChallenge'

describe('authentication()', () => {
    beforeAll(() => {
        localStorageMock.clear()
    })

    it('stores the code verifier in localStorage', async () => {
        await authentication()

        const storedVerifier = localStorageMock.getItem('code_verifier')
        expect(storedVerifier).toBe('TEST_VERIFIER_123')
    })

    it('calls PKCE functions correctly', async () => {
        const spyGenerate = vi.spyOn(codeChallenge, 'generateCodeVerifier')
        const spySha256 = vi.spyOn(codeChallenge, 'sha256')
        const spyBase64 = vi.spyOn(codeChallenge, 'base64encode')

        await authentication()

        expect(spyGenerate).toHaveBeenCalled()
        expect(spySha256).toHaveBeenCalledWith('TEST_VERIFIER_123')
        expect(spyBase64).toHaveBeenCalledWith(new Uint8Array([1,2,3,4]))
    })

    it('sets the correct redirect URL', async () => {
        await authentication()

        const url = new URL(window.location.href)
        expect(url.origin + url.pathname).toBe('https://accounts.spotify.com/authorize')
        expect(url.searchParams.get('redirect_uri')).toBe('http://127.0.0.1:5173/callback')
        expect(url.searchParams.get('code_challenge')).toBe('MOCKED_CODE_CHALLENGE')
        expect(url.searchParams.get('response_type')).toBe('code')
        expect(url.searchParams.get('client_id')).toBeDefined()
    })
})
