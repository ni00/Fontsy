import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PRESET_COLORS } from "@/lib/constants"

interface StyleSettingsProps {
  backgroundColor: string
  transparency: number[]
  borderRadius: number[]
  setBackgroundColor: (backgroundColor: string) => void
  setTransparency: (transparency: number[]) => void
  setBorderRadius: (borderRadius: number[]) => void
}

export const StyleSettings: React.FC<StyleSettingsProps> = ({
  backgroundColor,
  transparency,
  borderRadius,
  setBackgroundColor,
  setTransparency,
  setBorderRadius,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl">Background & Style</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div>
          <Label htmlFor="backgroundColor" className="text-sm">
            Background Color
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="backgroundColor"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-12 h-8 sm:w-16 sm:h-10"
            />
            <Input
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              placeholder="#FFFFFF"
              className="text-xs sm:text-sm"
            />
            <Button
              variant="outline"
              onClick={() => setBackgroundColor("transparent")}
              size="sm"
              className="text-xs px-2 sm:px-3"
            >
              Transparent
            </Button>
          </div>
          <div className="grid grid-cols-8 sm:flex sm:flex-wrap gap-1 sm:gap-2 mt-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-300"
                style={{ backgroundColor: color }}
                onClick={() => setBackgroundColor(color)}
              />
            ))}
          </div>
        </div>

        <div>
          <Label className="text-sm">Transparency: {transparency[0]}%</Label>
          <Slider
            value={transparency}
            onValueChange={setTransparency}
            max={100}
            min={0}
            step={5}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm">Border Radius: {borderRadius[0]}px</Label>
          <Slider
            value={borderRadius}
            onValueChange={setBorderRadius}
            max={50}
            min={0}
            step={1}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  )
} 