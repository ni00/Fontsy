import { GenerateParams, OutputFormat, PreviewStyle } from "./types"

// Load Google Font
export const loadGoogleFont = async (fontFamily: string): Promise<void> => {
  const link = document.createElement("link")
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@400;700&display=swap`
  link.rel = "stylesheet"
  document.head.appendChild(link)

  try {
    await document.fonts.load(`400 16px "${fontFamily}"`)
  } catch (error) {
    console.error("Font loading failed:", error)
  }
}

// Generate PNG image
export const generatePNG = (canvas: HTMLCanvasElement, params: GenerateParams): void => {
  const { text, fontFamily, fontSize, textColor, backgroundColor, transparency, borderRadius, width, height } = params

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  if (!ctx) return

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Set background
  if (backgroundColor !== "transparent" && transparency > 0) {
    ctx.fillStyle = backgroundColor
    ctx.globalAlpha = transparency / 100

    if (borderRadius > 0) {
      // Draw rounded rectangle
      const radius = Math.min(borderRadius, width / 2, height / 2)
      ctx.beginPath()
      ctx.roundRect(0, 0, width, height, radius)
      ctx.fill()
    } else {
      ctx.fillRect(0, 0, width, height)
    }
  }

  // Set text
  ctx.globalAlpha = 1
  ctx.fillStyle = textColor
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  // Calculate appropriate font size
  const baseFontSize = Math.min(width, height) * (fontSize / 100)
  ctx.font = `${baseFontSize}px "${fontFamily}", sans-serif`

  // Draw text
  ctx.fillText(text, width / 2, height / 2)
}

// Generate SVG image
export const generateSVG = (params: GenerateParams): string => {
  const { text, fontFamily, fontSize, textColor, backgroundColor, transparency, borderRadius, width, height } = params

  const baseFontSize = Math.min(width, height) * (fontSize / 100)

  let backgroundElement = ""
  if (backgroundColor !== "transparent" && transparency > 0) {
    const bgColor = backgroundColor
    const opacity = transparency / 100

    if (borderRadius > 0) {
      const radius = Math.min(borderRadius, width / 2, height / 2)
      backgroundElement = `<rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="${bgColor}" opacity="${opacity}"/>`
    } else {
      backgroundElement = `<rect width="${width}" height="${height}" fill="${bgColor}" opacity="${opacity}"/>`
    }
  }

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(" ", "+")}:wght@400;700&amp;display=swap');
      </style>
    </defs>
    ${backgroundElement}
    <text x="${width / 2}" y="${height / 2}" fontFamily="${fontFamily}, sans-serif" fontSize="${baseFontSize}" fill="${textColor}" textAnchor="middle" dominantBaseline="central">${text}</text>
  </svg>`
}

// Download PNG file
export const downloadPNG = (canvas: HTMLCanvasElement, filename: string): void => {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  })
}

// Download SVG file
export const downloadSVG = (svgContent: string, filename: string): void => {
  const blob = new Blob([svgContent], { type: "image/svg+xml" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

// Calculate preview style
export const calculatePreviewStyle = (
  fontFamily: string,
  fontSize: number,
  textColor: string,
  backgroundColor: string,
  transparency: number,
  borderRadius: number,
  previewWidth: number,
  previewHeight: number,
  isMobile: boolean
): PreviewStyle => {
  const previewFontSize = Math.min(previewWidth, previewHeight) * (fontSize / 200)

  return {
    fontFamily: `"${fontFamily}", sans-serif`,
    fontSize: `${previewFontSize}px`,
    color: textColor,
    backgroundColor: backgroundColor === "transparent" ? "transparent" : backgroundColor,
    opacity: transparency / 100,
    borderRadius: `${borderRadius}px`,
    width: `${previewWidth}px`,
    height: `${previewHeight}px`,
    maxWidth: "100%",
    maxHeight: isMobile ? "200px" : "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: backgroundColor === "transparent" ? "2px dashed #ccc" : "none",
    transition: "all 0.2s ease",
  }
}

// Get filename
export const getFileName = (width: number, height: number, format: OutputFormat): string => {
  return `logo-${width}x${height}.${format}`
} 