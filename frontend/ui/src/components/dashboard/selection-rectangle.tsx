import { useEffect, useState } from "react"

interface SelectionRectangleProps {
  startPoint: { x: number; y: number } | null
  endPoint: { x: number; y: number } | null
}

export function SelectionRectangle({ startPoint, endPoint }: SelectionRectangleProps) {
  const [style, setStyle] = useState({
    display: "none",
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    if (startPoint && endPoint) {
      const left = Math.min(startPoint.x, endPoint.x)
      const top = Math.min(startPoint.y, endPoint.y)
      const width = Math.abs(endPoint.x - startPoint.x)
      const height = Math.abs(endPoint.y - startPoint.y)

      setStyle({
        display: "block",
        left,
        top,
        width,
        height,
      })
    } else {
      setStyle({ ...style, display: "none" })
    }
  }, [startPoint, endPoint])

  if (!startPoint || !endPoint) return null

  return (
    <div
      className="fixed pointer-events-none border-2 border-blue-500 bg-blue-100/20 z-50"
      style={{
        display: style.display,
        left: style.left,
        top: style.top,
        width: style.width,
        height: style.height,
        position: "fixed",
      }}
    />
  )
}
