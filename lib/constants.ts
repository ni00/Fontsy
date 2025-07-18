// Common Google Fonts list - used as fallback
// The actual font list should be fetched from API via useGoogleFonts hook
export const GOOGLE_FONTS = [
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Oswald",
  "Source Sans Pro",
  "Raleway",
  "PT Sans",
  "Lora",
  "Merriweather",
  "Playfair Display",
  "Poppins",
  "Nunito",
  "Ubuntu",
  "Mukti",
  "Fira Sans",
  "Work Sans",
  "Crimson Text",
  "Libre Baskerville",
]

// Preset colors
export const PRESET_COLORS = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
]

// Resolution presets
export const RESOLUTIONS = [
  { name: "Favicon 16x16", width: 16, height: 16 },
  { name: "Favicon 32x32", width: 32, height: 32 },
  { name: "Favicon 48x48", width: 48, height: 48 },
  { name: "Favicon 64x64", width: 64, height: 64 },
  { name: "iOS App Icon 1024x1024", width: 1024, height: 1024 },
  { name: "Android App Icon 512x512", width: 512, height: 512 },
  { name: "Apple Touch Icon 180x180", width: 180, height: 180 },
  { name: "Twitter Card 1200x600", width: 1200, height: 600 },
  { name: "Facebook Cover 851x315", width: 851, height: 315 },
  { name: "Instagram Square 1080x1080", width: 1080, height: 1080 },
  { name: "LinkedIn Banner 1584x396", width: 1584, height: 396 },
  { name: "YouTube Thumbnail 1280x720", width: 1280, height: 720 },
  { name: "OG Image 1200x630", width: 1200, height: 630 },
  { name: "OG Square 1200x1200", width: 1200, height: 1200 },
  { name: "A4 Portrait 2480x3508", width: 2480, height: 3508 },
  { name: "A4 Landscape 3508x2480", width: 3508, height: 2480 },
  { name: "HD 1920x1080", width: 1920, height: 1080 },
  { name: "4K 3840x2160", width: 3840, height: 2160 },
  { name: "Custom", width: 512, height: 512 },
]

// Preset preview sizes - organized by use case
export const PREVIEW_SIZES = [
  // Social Media
  { name: "Instagram Post", width: 108, height: 108 },
  { name: "Twitter Header", width: 150, height: 75 },
  { name: "Facebook Cover", width: 164, height: 60 },
  { name: "YouTube Thumb", width: 160, height: 90 },
  { name: "LinkedIn Post", width: 120, height: 60 },
  
  // App Icons
  { name: "App Icon", width: 60, height: 60 },
  { name: "Store Icon", width: 128, height: 128 },
  
  // Favicons
  { name: "Favicon 16", width: 16, height: 16 },
  { name: "Favicon 32", width: 32, height: 32 },
  { name: "Favicon 64", width: 64, height: 64 },
  
  // Common Sizes
  { name: "Small", width: 100, height: 100 },
  { name: "Medium", width: 200, height: 200 },
  { name: "Large", width: 300, height: 300 },
  
  // Aspect Ratios
  { name: "Square", width: 200, height: 200 },
  { name: "Landscape", width: 240, height: 120 },
  { name: "Portrait", width: 120, height: 240 },
  { name: "Wide", width: 300, height: 150 },
  
  // Original presets
  { name: "Classic", width: 200, height: 120 },
  { name: "OG Ratio", width: 300, height: 157 },
]

// Default configuration
export const DEFAULT_CONFIG = {
  text: "Logo",
  fontFamily: "Inter",
  fontSize: 48,
  textColor: "#000000",
  backgroundColor: "#FFFFFF",
  transparency: 100,
  borderRadius: 0,
  outputFormat: "png",
  quality: 90,
  previewWidth: 200,
  previewHeight: 120,
  customWidth: 512,
  customHeight: 512,
  defaultResolutionIndex: 12, // OG Square 1200x1200
  aspectRatioLocked: true,
} 