import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

/**
 * Register GSAP plugins ONCE, here. Always import gsap from this file
 * (`import { gsap } from '@/animations/gsap'`), never from 'gsap' directly,
 * so plugins are guaranteed to be registered before use.
 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

gsap.defaults({ ease: 'power3.out' })

// Stops mobile address-bar resizes from triggering expensive ScrollTrigger refreshes.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, ScrollToPlugin }
