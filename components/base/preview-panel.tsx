import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { calculatePreviewStyle } from "@/lib/logo-utils"
import { PREVIEW_SIZES } from "@/lib/constants"

interface PreviewPanelProps {
  // Preview configuration
  text: string
  fontFamily: string
  fontSize: number
  textColor: string
  backgroundColor: string
  transparency: number
  borderRadius: number
  
  // Preview size
  previewWidth: number[]
  previewHeight: number[]
  aspectRatioLocked: boolean
  
  // System state
  isMobile: boolean
  
  // Resolution info
  getCurrentResolution: () => { width: number; height: number }
  
  // Setter functions
  updatePreviewWidth: (value: number[]) => void
  updatePreviewHeight: (value: number[]) => void
  setAspectRatioLocked: (locked: boolean) => void
  setPreviewSize: (width: number, height: number) => void
  syncExportSize: () => void
  
  // Refs
  previewRef: React.RefObject<HTMLDivElement | null>
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({
  text,
  fontFamily,
  fontSize,
  textColor,
  backgroundColor,
  transparency,
  borderRadius,
  previewWidth,
  previewHeight,
  aspectRatioLocked,
  isMobile,
  getCurrentResolution,
  updatePreviewWidth,
  updatePreviewHeight,
  setAspectRatioLocked,
  setPreviewSize,
  syncExportSize,
  previewRef,
}) => {
  const currentPreviewWidth = previewWidth[0]
  const currentPreviewHeight = previewHeight[0]
  
  const previewStyle = calculatePreviewStyle(
    fontFamily,
    fontSize,
    textColor,
    backgroundColor,
    transparency,
    borderRadius,
    currentPreviewWidth,
    currentPreviewHeight,
    isMobile
  )

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-lg sm:text-xl">
          Live Preview
          <Button
            variant="outline"
            size="sm"
            onClick={syncExportSize}
            className="text-xs sm:text-sm"
          >
            Sync Export Size
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        {/* Preview size control */}
        <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Preview Size</Label>
            <div className="flex items-center gap-2">
              <Label className="text-xs">Lock Ratio</Label>
              <input
                type="checkbox"
                checked={aspectRatioLocked}
                onChange={(e) => setAspectRatioLocked(e.target.checked)}
                className="w-3 h-3 sm:w-4 sm:h-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label className="text-xs">Width: {currentPreviewWidth}px</Label>
              <Slider
                value={previewWidth}
                onValueChange={updatePreviewWidth}
                max={isMobile ? 300 : 600}
                min={50}
                step={10}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Height: {currentPreviewHeight}px</Label>
              <Slider
                value={previewHeight}
                onValueChange={updatePreviewHeight}
                max={isMobile ? 200 : 400}
                min={30}
                step={10}
                className="mt-1"
              />
            </div>
          </div>

          {/* Preset size quick buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            {PREVIEW_SIZES.map((size) => (
              <Button
                key={size.name}
                variant="outline"
                size="sm"
                onClick={() => setPreviewSize(size.width, size.height)}
                className="text-xs"
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Preview area */}
        <div className="flex items-center justify-center p-4 sm:p-8 bg-gray-50 rounded-lg overflow-auto">
          <div ref={previewRef} style={previewStyle}>
            {text}
          </div>
        </div>
        
        <div className="text-center text-xs sm:text-sm text-gray-600">
          Preview: {currentPreviewWidth} × {currentPreviewHeight}px | Export: {getCurrentResolution().width} × {getCurrentResolution().height}px
        </div>
      </CardContent>
    </Card>
  )
} 