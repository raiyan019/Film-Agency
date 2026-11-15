import { useEffect } from 'react'
import { siteConfig, siteTitle } from '@/data/siteConfig'

/**
 * Sets <title> and meta description for the current page.
 * Usage: useDocumentMeta({ title: 'Work', description: '...' })
 * Omit `title` on the home page to use the default title.
 */
export function useDocumentMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title
      ? `${title}${siteConfig.seo.titleSeparator}${siteTitle}`
      : `${siteTitle}${siteConfig.seo.titleSeparator}${siteConfig.tagline}`

    const text = description || siteConfig.seo.defaultDescription
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', text)
  }, [title, description])
}
