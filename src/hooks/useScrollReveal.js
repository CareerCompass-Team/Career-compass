import { useEffect, useRef, useState } from 'react'

/**
 * useScrollReveal — Intersection Observer hook for scroll-triggered animations.
 * Returns a ref to attach to the element and a boolean `isVisible`.
 * Once visible, stays visible (one-shot reveal).
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}

/**
 * useCountUp — Animates a number from 0 to `end` when `trigger` becomes true.
 * Returns the current animated value as a string with the original suffix (e.g. "12,400+").
 */
export function useCountUp(target, trigger, duration = 1400) {
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!trigger) return

    // Parse numeric value and suffix separately
    const numStr = target.replace(/[^0-9.]/g, '')
    const suffix = target.replace(/[0-9.,]/g, '')
    const end = parseFloat(numStr.replace(/,/g, ''))
    if (isNaN(end)) { setDisplay(target); return }

    const startTime = performance.now()
    let raf

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * end)

      // Re-format with commas if original had them
      const formatted = target.includes(',')
        ? current.toLocaleString()
        : String(current)

      setDisplay(formatted + suffix)

      if (progress < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [trigger, target, duration])

  return display
}
