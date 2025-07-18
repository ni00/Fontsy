"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Type, Palette, Settings } from "lucide-react"
import { useLogoGenerator } from "@/hooks/use-logo-generator"
import { TextSettings } from "@/components/base/text-settings"
import { StyleSettings } from "@/components/base/style-settings"
import { ExportSettings } from "@/components/base/export-settings"
import { PreviewPanel } from "@/components/base/preview-panel"

export default function LogoGenerator() {
  const logoGenerator = useLogoGenerator()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Fontsy</h1>
          <p className="text-sm sm:text-base text-gray-600">Google Fonts Logo Generator</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {/* Control panel */}
          <div className="space-y-4 lg:space-y-6">
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Type className="w-3 h-3 sm:w-4 sm:h-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="style" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Palette className="w-3 h-3 sm:w-4 sm:h-4" />
                  Style
                </TabsTrigger>
                <TabsTrigger value="export" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-3 sm:space-y-4">
                <TextSettings
                  text={logoGenerator.text}
                  fontFamily={logoGenerator.fontFamily}
                  fontSize={logoGenerator.fontSize}
                  textColor={logoGenerator.textColor}
                  setText={logoGenerator.setText}
                  setFontFamily={logoGenerator.setFontFamily}
                  setFontSize={logoGenerator.setFontSize}
                  setTextColor={logoGenerator.setTextColor}
                />
              </TabsContent>

              <TabsContent value="style" className="space-y-3 sm:space-y-4">
                <StyleSettings
                  backgroundColor={logoGenerator.backgroundColor}
                  transparency={logoGenerator.transparency}
                  borderRadius={logoGenerator.borderRadius}
                  setBackgroundColor={logoGenerator.setBackgroundColor}
                  setTransparency={logoGenerator.setTransparency}
                  setBorderRadius={logoGenerator.setBorderRadius}
                />
              </TabsContent>

              <TabsContent value="export" className="space-y-3 sm:space-y-4">
                <ExportSettings
                  resolution={logoGenerator.resolution}
                  customWidth={logoGenerator.customWidth}
                  customHeight={logoGenerator.customHeight}
                  outputFormat={logoGenerator.outputFormat}
                  quality={logoGenerator.quality}
                  setResolution={logoGenerator.setResolution}
                  setCustomWidth={logoGenerator.setCustomWidth}
                  setCustomHeight={logoGenerator.setCustomHeight}
                  setOutputFormat={logoGenerator.setOutputFormat}
                  setQuality={logoGenerator.setQuality}
                  downloadFile={logoGenerator.downloadFile}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview area */}
          <div className="space-y-4 lg:space-y-6">
            <PreviewPanel
              text={logoGenerator.text}
              fontFamily={logoGenerator.fontFamily}
              fontSize={logoGenerator.fontSize[0]}
              textColor={logoGenerator.textColor}
              backgroundColor={logoGenerator.backgroundColor}
              transparency={logoGenerator.transparency[0]}
              borderRadius={logoGenerator.borderRadius[0]}
              previewWidth={logoGenerator.previewWidth}
              previewHeight={logoGenerator.previewHeight}
              aspectRatioLocked={logoGenerator.aspectRatioLocked}
              isMobile={logoGenerator.isMobile}
              getCurrentResolution={logoGenerator.getCurrentResolution}
              updatePreviewWidth={logoGenerator.updatePreviewWidth}
              updatePreviewHeight={logoGenerator.updatePreviewHeight}
              setAspectRatioLocked={logoGenerator.setAspectRatioLocked}
              setPreviewSize={logoGenerator.setPreviewSize}
              syncExportSize={logoGenerator.syncExportSize}
              previewRef={logoGenerator.previewRef}
            />
          </div>
        </div>

        {/* Hidden canvas for PNG generation */}
        <canvas ref={logoGenerator.canvasRef} style={{ display: "none" }} />
      </div>
    </div>
  )
}
