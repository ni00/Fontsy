import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { PRESET_COLORS } from "@/lib/constants"
import { useGoogleFonts } from "@/hooks/use-google-fonts"

interface TextSettingsProps {
  text: string
  fontFamily: string
  fontSize: number[]
  textColor: string
  setText: (text: string) => void
  setFontFamily: (fontFamily: string) => void
  setFontSize: (fontSize: number[]) => void
  setTextColor: (textColor: string) => void
}

export const TextSettings: React.FC<TextSettingsProps> = ({
  text,
  fontFamily,
  fontSize,
  textColor,
  setText,
  setFontFamily,
  setFontSize,
  setTextColor,
}) => {
  const { fontNames, loading, error, fonts } = useGoogleFonts()
  const [open, setOpen] = useState(false)
  
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
          Text Settings
          {loading && <Badge variant="secondary" className="text-xs">Loading...</Badge>}
          {error && <Badge variant="destructive" className="text-xs">Offline Mode</Badge>}
          {!loading && !error && <Badge variant="default" className="text-xs">{fonts.length} Fonts</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
        <div>
          <Label htmlFor="text" className="text-sm">
            Text
          </Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your logo text"
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm">
            Google Font
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between mt-1"
              >
                {fontFamily || "Select font..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0" align="start">
              <Command>
                <CommandInput placeholder="Search fonts..." />
                <CommandList>
                  <CommandEmpty>No fonts found</CommandEmpty>
                  <CommandGroup>
                    {fontNames.map((font) => (
                      <CommandItem
                        key={font}
                        value={font}
                        onSelect={(currentValue) => {
                          setFontFamily(currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            fontFamily === font ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span style={{ fontFamily: font }}>{font}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open('https://fonts.google.com/', '_blank')}
            className="mt-2 w-full"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Browse More Fonts
          </Button>
        </div>

        <div>
          <Label className="text-sm">Font Size: {fontSize[0]}%</Label>
          <Slider
            value={fontSize}
            onValueChange={setFontSize}
            max={200}
            min={10}
            step={5}
            className="mt-2"
          />
        </div>

        <div>
          <Label htmlFor="textColor" className="text-sm">
            Text Color
          </Label>
          <div className="flex gap-2 mt-2">
            <Input
              id="textColor"
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-8 sm:w-16 sm:h-10"
            />
            <Input
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              placeholder="#000000"
              className="text-xs sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-8 sm:flex sm:flex-wrap gap-1 sm:gap-2 mt-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2 border-gray-300"
                style={{ backgroundColor: color }}
                onClick={() => setTextColor(color)}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 