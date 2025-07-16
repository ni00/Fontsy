// Resolution type
export interface Resolution {
  name: string
  width: number
  height: number
}

// Preview size type
export interface PreviewSize {
  name: string
  width: number
  height: number
}

// Output format type
export type OutputFormat = "png" | "svg"

// Logo configuration type
export interface LogoConfig {
  text: string
  fontFamily: string
  fontSize: number
  textColor: string
  backgroundColor: string
  transparency: number
  borderRadius: number
  outputFormat: OutputFormat
  previewWidth: number
  previewHeight: number
  customWidth: number
  customHeight: number
  aspectRatioLocked: boolean
}

// Generate parameters type
export interface GenerateParams {
  text: string
  fontFamily: string
  fontSize: number
  textColor: string
  backgroundColor: string
  transparency: number
  borderRadius: number
  width: number
  height: number
}

// Preview style type
export interface PreviewStyle {
  fontFamily: string
  fontSize: string
  color: string
  backgroundColor: string
  opacity: number
  borderRadius: string
  width: string
  height: string
  maxWidth: string
  maxHeight: string
  display: string
  alignItems: string
  justifyContent: string
  border: string
  transition: string
}

// Google Fonts API type definitions
export interface GoogleFontFamily {
  family: string
  displayName?: string
  category: string
  stroke?: string
  classifications: string[]
  size: number
  subsets: string[]
  fonts: { [key: string]: { [key: string]: string } }
  axes: string[]
  designers: string[]
  lastModified: string
  dateAdded: string
  popularity: number
  trending: number
  defaultSort: number
  androidFragment?: string
  isNoto: boolean
  colorCapabilities: string[]
  primaryScript: string
  primaryLanguage: string
  isOpenSource: boolean
  isBrandFont: boolean
  languages: string[]
}

export interface GoogleFontsMetadata {
  axisRegistry: { [key: string]: any }
  familyMetadataList: GoogleFontFamily[]
}

export interface GoogleFontsState {
  fonts: GoogleFontFamily[]
  loading: boolean
  error: string | null
  fontNames: string[]
} 