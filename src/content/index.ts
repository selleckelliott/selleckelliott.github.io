import raw from './dynamic.json'
import type { DynamicContent } from './types'

/** Typed view of the auto-synced content. */
export const dynamic = raw as unknown as DynamicContent

export * from './types'
export { site } from './data'
