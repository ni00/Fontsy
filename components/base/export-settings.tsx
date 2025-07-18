import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { Resolution, OutputFormat } from "@/lib/types"
import { RESOLUTIONS } from "@/lib/constants"

interface ExportSettingsProps {
  resolution: Resolution
  customWidth: number
  customHeight: number
  outputFormat: OutputFormat
  quality: number
  setResolution: (resolution: Resolution) => void
  setCustomWidth: (width: number) => void
  setCustomHeight: (height: number) => void
  setOutputFormat: (format: OutputFormat) => void
  setQuality: (quality: number) => void
  downloadFile: () => void
}

export const ExportSettings: React.FC<ExportSettingsProps> = ({
  resolution,
  customWidth,
  customHeight,
  outputFormat,
  quality,
  setResolution,
  setCustomWidth,
  setCustomHeight,
  setOutputFormat,
  setQuality,
  downloadFile,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl">Export Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div>
          <Label className="text-sm">Resolution Preset</Label>
          <Select
            value={resolution.name}
            onValueChange={(value) => {
              const selected = RESOLUTIONS.find((r) => r.name === value)
              if (selected) setResolution(selected)
            }}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {RESOLUTIONS.map((res) => (
                <SelectItem key={res.name} value={res.name}>
                  {res.name} ({res.width}×{res.height})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {resolution.name === "Custom" && (
          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            <div>
              <Label htmlFor="width" className="text-sm">
                Width
              </Label>
              <Input
                id="width"
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="height" className="text-sm">
                Height
              </Label>
              <Input
                id="height"
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(Number(e.target.value))}
                className="mt-1"
              />
            </div>
          </div>
        )}

        <div>
          <Label className="text-sm">Output Format</Label>
          <Select value={outputFormat} onValueChange={setOutputFormat}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="png">PNG (Lossless)</SelectItem>
              <SelectItem value="jpeg">JPEG (Lossy)</SelectItem>
              <SelectItem value="webp">WebP (Modern)</SelectItem>
              <SelectItem value="avif">AVIF (Next-gen)</SelectItem>
              <SelectItem value="svg">SVG (Vector)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {['jpeg', 'webp', 'avif'].includes(outputFormat) && (
          <div>
            <Label className="text-sm">Quality: {quality}%</Label>
            <input
              type="range"
              min="10"
              max="100"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer mt-1"
            />
          </div>
        )}

        <Button onClick={downloadFile} className="w-full" size="lg">
          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
          Download {outputFormat.toUpperCase()}
        </Button>
      </CardContent>
    </Card>
  )
} 