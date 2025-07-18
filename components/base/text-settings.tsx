import { useState, useMemo, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, ExternalLink, Search } from "lucide-react"
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

// Virtual Font Selector Component
const VirtualFontSelector: React.FC<{
  fonts: string[]
  selectedFont: string
  onSelect: (font: string) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  loading: boolean
  error: string | null
}> = ({ fonts, selectedFont, onSelect, searchQuery, onSearchChange, loading, error }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 50 })
  const [scrollTop, setScrollTop] = useState(0)
  const itemHeight = 44
  const containerHeight = 300
  const bufferSize = 10

  // Filter fonts based on search
  const filteredFonts = useMemo(() => {
    if (!searchQuery) return fonts
    return fonts.filter(font => 
      font.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [fonts, searchQuery])

  const totalHeight = filteredFonts.length * itemHeight
  const visibleCount = Math.ceil(containerHeight / itemHeight) + bufferSize * 2

  const visibleFonts = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize)
    const end = Math.min(filteredFonts.length, start + visibleCount)
    return {
      fonts: filteredFonts.slice(start, end),
      start,
      end
    }
  }, [filteredFonts, scrollTop, itemHeight, visibleCount])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
    const newStart = Math.max(0, Math.floor(e.currentTarget.scrollTop / itemHeight) - bufferSize)
    const newEnd = Math.min(filteredFonts.length, newStart + visibleCount)
    setVisibleRange({ start: newStart, end: newEnd })
  }, [filteredFonts.length, itemHeight, visibleCount])

  const handleWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault()
    const container = e.currentTarget
    container.scrollTop += e.deltaY
  }, [])

  if (loading) {
    return (
      <div className="w-full max-h-[300px] p-4 text-center text-sm text-gray-500">
        Loading fonts...
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full max-h-[300px] p-4 text-center text-sm text-gray-500">
        Using fallback fonts...
      </div>
    )
  }

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search fonts..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div 
        ref={containerRef}
        className="relative max-h-[300px] overflow-y-auto scrollbar-thin mt-2"
        onScroll={handleScroll}
        onWheel={handleWheel}
      >
        <div style={{ height: totalHeight }} className="relative">
          <div 
            style={{ 
              transform: `translateY(${visibleFonts.start * itemHeight}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            {visibleFonts.fonts.map((font) => (
              <div
                key={font}
                className={cn(
                  "flex items-center px-3 py-2 cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors",
                  selectedFont === font && "bg-blue-100 dark:bg-blue-900/30"
                )}
                onClick={() => onSelect(font)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4 flex-shrink-0",
                    selectedFont === font ? "opacity-100" : "opacity-0"
                  )}
                />
                <span style={{ fontFamily: font }} className="text-sm truncate">
                  {font}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-gray-500 text-center mt-2">
        {filteredFonts.length === fonts.length 
          ? `${filteredFonts.length} fonts` 
          : `${filteredFonts.length} of ${fonts.length} fonts`}
      </div>
    </div>
  )
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
  const [searchQuery, setSearchQuery] = useState("")
  
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
              <VirtualFontSelector
                fonts={fontNames}
                selectedFont={fontFamily}
                onSelect={setFontFamily}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                loading={loading}
                error={error}
              />
            </PopoverContent>
          </Popover>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-blue-600 hover:text-blue-800 mt-1 h-auto p-0"
            onClick={() => window.open('https://fonts.google.com', '_blank')}
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Browse Google Fonts
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