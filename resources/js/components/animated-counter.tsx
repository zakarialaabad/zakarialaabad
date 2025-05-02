
import { useState, useEffect } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  suffix?: string
}

export function AnimatedCounter({ value, duration = 2000, suffix = "" }: AnimatedCounterProps){
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)

      setCount(Math.floor(percentage * value))

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    animationFrame = requestAnimationFrame(updateCount)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}
