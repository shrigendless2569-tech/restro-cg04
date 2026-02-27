'use client'

import { useEffect } from 'react'

/**
 * Attaches an IntersectionObserver to all elements with [data-reveal].
 * When an element enters the viewport, it gets the class "visible" added,
 * which triggers CSS animations defined in globals.css.
 *
 * Usage: call useScrollReveal() in any Client Component (e.g. page.tsx or layout).
 * Add data-reveal (and optionally data-reveal-delay="100") to any element.
 */
export function useScrollReveal() {
    useEffect(() => {
        const targets = document.querySelectorAll<HTMLElement>('[data-reveal]')

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement
                        const delay = el.dataset.revealDelay ?? '0'
                        el.style.transitionDelay = `${delay}ms`
                        el.classList.add('visible')
                        observer.unobserve(el) // animate once
                    }
                })
            },
            { threshold: 0.12 }
        )

        targets.forEach((el) => observer.observe(el))
        return () => observer.disconnect()
    }, [])
}
