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
  { name: "Apple Touch Icon 180x180", width: 180, height: 180 },
  { name: "OG Image 1200x630", width: 1200, height: 630 },
  { name: "OG Square 1200x1200", width: 1200, height: 1200 },
  { name: "Custom", width: 512, height: 512 },
]

// Preset preview sizes
export const PREVIEW_SIZES = [
  { name: "64×64", width: 64, height: 64 },
  { name: "128×128", width: 128, height: 128 },
  { name: "200×120", width: 200, height: 120 },
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
  previewWidth: 200,
  previewHeight: 120,
  customWidth: 512,
  customHeight: 512,
  defaultResolutionIndex: 4, // OG Square 1200x1200
  aspectRatioLocked: true,
} 