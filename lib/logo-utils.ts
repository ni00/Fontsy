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

  // Calculate font size based on canvas dimensions and user font size
  const baseFontSize = Math.min(width, height) * 0.5; // Base size for 100%
  const targetFontSize = baseFontSize * (fontSize / 100)
  
  // Ensure text fits within canvas with padding
  const maxWidth = width * 0.95
  const maxHeight = height * 0.95
  
  // Start with target size and scale down if needed
  let actualFontSize = targetFontSize
  ctx.font = `${actualFontSize}px "${fontFamily}", sans-serif`
  
  // Measure text and adjust if it exceeds bounds
  const metrics = ctx.measureText(text)
  const textWidth = metrics.width
  const textHeight = actualFontSize // Approximate height
  
  if (textWidth > maxWidth || textHeight > maxHeight) {
    const widthScale = maxWidth / textWidth
    const heightScale = maxHeight / textHeight
    actualFontSize = Math.min(actualFontSize * widthScale, actualFontSize * heightScale)
    ctx.font = `${actualFontSize}px "${fontFamily}", sans-serif`
  }

  // Draw text
  ctx.fillText(text, width / 2, height / 2)
}

// Generate SVG image
export const generateSVG = (params: GenerateParams): string => {
  const { text, fontFamily, fontSize, textColor, backgroundColor, transparency, borderRadius, width, height } = params

  // Calculate font size using the same logic as PNG generation
  const baseFontSize = Math.min(width, height) * 0.5; // Base size for 100%
  const targetFontSize = baseFontSize * (fontSize / 100)
  const maxWidth = width * 0.95
  const maxHeight = height * 0.95
  
  // SVG text measurement is different - use approximate scaling
  let actualFontSize = targetFontSize
  const estimatedTextWidth = text.length * actualFontSize * 0.5 // Rough estimate
  const estimatedTextHeight = actualFontSize
  
  if (estimatedTextWidth > maxWidth || estimatedTextHeight > maxHeight) {
    const widthScale = maxWidth / estimatedTextWidth
    const heightScale = maxHeight / estimatedTextHeight
    actualFontSize = Math.min(actualFontSize * widthScale, actualFontSize * heightScale)
  }

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

  const svgText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  ${backgroundElement}
  <text x="${width / 2}" y="${height / 2}" 
        font-family="${fontFamily}, sans-serif" 
        font-size="${actualFontSize}" 
        fill="${textColor}" 
        text-anchor="middle" 
        dominant-baseline="middle">
    ${svgText}
  </text>
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

// Download JPEG file with quality
export const downloadJPEG = (canvas: HTMLCanvasElement, filename: string, quality: number = 0.9): void => {
  const dataURL = canvas.toDataURL("image/jpeg", quality)
  const a = document.createElement("a")
  a.href = dataURL
  a.download = filename
  a.click()
}

// Download WebP file with quality
export const downloadWebP = (canvas: HTMLCanvasElement, filename: string, quality: number = 0.9): void => {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, "image/webp", quality)
}

// Download AVIF file with quality
export const downloadAVIF = (canvas: HTMLCanvasElement, filename: string, quality: number = 0.8): void => {
  canvas.toBlob((blob) => {
    if (!blob) return
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }, "image/avif", quality)
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
  text: string,
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
  // Use consistent font sizing with export - match the exact calculation used in canvas
  const baseFontSize = Math.min(previewWidth, previewHeight) * 0.5; // Base size for 100%
  const targetFontSize = baseFontSize * (fontSize / 100)
  const maxWidth = previewWidth * 0.95
  const maxHeight = previewHeight * 0.95
  
  let previewFontSize = targetFontSize
  
  // More accurate text width estimation for preview
  const avgCharWidth = previewFontSize * 0.5 // Average character width factor
  const estimatedTextWidth = text.length * avgCharWidth
  const estimatedTextHeight = previewFontSize * 1.1 // Account for line height
  
  if (estimatedTextWidth > maxWidth || estimatedTextHeight > maxHeight) {
    const widthScale = maxWidth / estimatedTextWidth
    const heightScale = maxHeight / estimatedTextHeight
    previewFontSize = Math.min(previewFontSize * Math.min(widthScale, heightScale), previewFontSize * 0.9)
  }

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
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }
}

// Get filename
export const getFileName = (width: number, height: number, format: OutputFormat): string => {
  return `logo-${width}x${height}.${format}`
} 