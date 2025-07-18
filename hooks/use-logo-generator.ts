import { useState, useEffect, useRef } from "react"
import { Resolution, OutputFormat, GenerateParams } from "@/lib/types"
import { RESOLUTIONS, DEFAULT_CONFIG } from "@/lib/constants"
import { loadGoogleFont, generatePNG, generateSVG, downloadPNG, downloadSVG, downloadJPEG, downloadWebP, downloadAVIF, getFileName } from "@/lib/logo-utils"

export const useLogoGenerator = () => {
  // Basic configuration state
  const [text, setText] = useState(DEFAULT_CONFIG.text)
  const [fontFamily, setFontFamily] = useState(DEFAULT_CONFIG.fontFamily)
  const [fontSize, setFontSize] = useState([DEFAULT_CONFIG.fontSize])
  const [textColor, setTextColor] = useState(DEFAULT_CONFIG.textColor)
  const [backgroundColor, setBackgroundColor] = useState(DEFAULT_CONFIG.backgroundColor)
  const [transparency, setTransparency] = useState([DEFAULT_CONFIG.transparency])
  const [borderRadius, setBorderRadius] = useState([DEFAULT_CONFIG.borderRadius])
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(DEFAULT_CONFIG.outputFormat as OutputFormat)
  const [quality, setQuality] = useState(DEFAULT_CONFIG.quality)
  
  // Resolution related state
  const [resolution, setResolution] = useState<Resolution>(RESOLUTIONS[DEFAULT_CONFIG.defaultResolutionIndex])
  const [customWidth, setCustomWidth] = useState(DEFAULT_CONFIG.customWidth)
  const [customHeight, setCustomHeight] = useState(DEFAULT_CONFIG.customHeight)
  
  // Preview related state
  const [previewWidth, setPreviewWidth] = useState([DEFAULT_CONFIG.previewWidth])
  const [previewHeight, setPreviewHeight] = useState([DEFAULT_CONFIG.previewHeight])
  const [aspectRatioLocked, setAspectRatioLocked] = useState(DEFAULT_CONFIG.aspectRatioLocked)
  
  // System state
  const [fontLoaded, setFontLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load Google Font
  useEffect(() => {
    const loadFont = async () => {
      await loadGoogleFont(fontFamily)
      setFontLoaded(true)
    }

    loadFont()
  }, [fontFamily])

  // Get current resolution
  const getCurrentResolution = () => {
    if (resolution.name === "Custom") {
      return { width: customWidth, height: customHeight }
    }
    return { width: resolution.width, height: resolution.height }
  }

  // Get generation parameters
  const getGenerateParams = (): GenerateParams => {
    const currentResolution = getCurrentResolution()
    return {
      text,
      fontFamily,
      fontSize: fontSize[0],
      textColor,
      backgroundColor,
      transparency: transparency[0],
      borderRadius: borderRadius[0],
      width: currentResolution.width,
      height: currentResolution.height,
    }
  }

  // Download file
  const downloadFile = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const params = getGenerateParams()
    const filename = getFileName(params.width, params.height, outputFormat)

    switch (outputFormat) {
      case "png":
        generatePNG(canvas, params)
        downloadPNG(canvas, filename)
        break
      case "jpeg":
        generatePNG(canvas, params)
        downloadJPEG(canvas, filename.replace('.png', '.jpeg'), quality / 100)
        break
      case "webp":
        generatePNG(canvas, params)
        downloadWebP(canvas, filename.replace('.png', '.webp'), quality / 100)
        break
      case "avif":
        generatePNG(canvas, params)
        downloadAVIF(canvas, filename.replace('.png', '.avif'), quality / 100)
        break
      case "svg":
      default:
        const svgContent = generateSVG(params)
        downloadSVG(svgContent, filename)
        break
    }
  }

  // Sync export size to preview
  const syncExportSize = () => {
    const { width, height } = getCurrentResolution()
    setPreviewWidth([Math.min(width, isMobile ? 250 : 400)])
    setPreviewHeight([Math.min(height, isMobile ? 150 : 300)])
  }

  // Update preview width (supports aspect ratio lock)
  const updatePreviewWidth = (value: number[]) => {
    setPreviewWidth(value)
    if (aspectRatioLocked) {
      const ratio = previewHeight[0] / previewWidth[0]
      setPreviewHeight([Math.round(value[0] * ratio)])
    }
  }

  // Update preview height (supports aspect ratio lock)
  const updatePreviewHeight = (value: number[]) => {
    setPreviewHeight(value)
    if (aspectRatioLocked) {
      const ratio = previewWidth[0] / previewHeight[0]
      setPreviewWidth([Math.round(value[0] * ratio)])
    }
  }

  // Set preview size
  const setPreviewSize = (width: number, height: number) => {
    setPreviewWidth([width])
    setPreviewHeight([height])
  }

  return {
    // State
    text,
    fontFamily,
    fontSize,
    textColor,
    backgroundColor,
    transparency,
    borderRadius,
    outputFormat,
    quality,
    resolution,
    customWidth,
    customHeight,
    previewWidth,
    previewHeight,
    aspectRatioLocked,
    fontLoaded,
    isMobile,
    
    // Refs
    canvasRef,
    previewRef,
    
    // Setter functions
    setText,
    setFontFamily,
    setFontSize,
    setTextColor,
    setBackgroundColor,
    setTransparency,
    setBorderRadius,
    setOutputFormat,
    setQuality,
    setResolution,
    setCustomWidth,
    setCustomHeight,
    setPreviewWidth,
    setPreviewHeight,
    setAspectRatioLocked,
    
    // Utility functions
    getCurrentResolution,
    getGenerateParams,
    downloadFile,
    syncExportSize,
    updatePreviewWidth,
    updatePreviewHeight,
    setPreviewSize,
  }
} 