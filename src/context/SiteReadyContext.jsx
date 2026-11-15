import { createContext, useContext } from 'react'

/**
 * `isReady` becomes true once the preloader has finished (or was skipped).
 * Phase 3 hero animations should wait for it:  const isReady = useSiteReady()
 */
const SiteReadyContext = createContext({ isReady: true })

export const SiteReadyProvider = SiteReadyContext.Provider

export function useSiteReady() {
  return useContext(SiteReadyContext).isReady
}
