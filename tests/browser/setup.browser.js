import { beforeAll, afterEach, afterAll } from 'vitest'
import { worker } from '../mocks/browser'

beforeAll(() => worker.start({ quiet: true }))
afterEach(() => worker.resetHandlers())
afterAll(() => worker.stop())
