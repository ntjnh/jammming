import { vi } from 'vitest'

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

vi.stubGlobal('window', {
    localStorage: localStorageMock,
    location: {
        search: '',
        href: ''
    },
    document: {}
})

vi.stubGlobal('localStorage', localStorageMock)
