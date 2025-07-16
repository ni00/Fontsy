"use client"

import { useState, useEffect, useCallback } from "react"
import { GoogleFontsMetadata, GoogleFontsState, GoogleFontFamily } from "@/lib/types"
import { GOOGLE_FONTS } from "@/lib/constants"

const GOOGLE_FONTS_API_URL = "/api/google-fonts"

export function useGoogleFonts() {
  const [state, setState] = useState<GoogleFontsState>({
    fonts: [],
    loading: true,
    error: null,
    fontNames: GOOGLE_FONTS, // Use fallback as initial value
  })

  const fetchGoogleFonts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }))
      
      const response = await fetch(GOOGLE_FONTS_API_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
            // Check if API route returned an error
      if (data.error) {
        throw new Error(data.error)
      }
      
      const fontsData: GoogleFontsMetadata = data
      
      // Filter and sort fonts by popularity
      const filteredFonts = fontsData.familyMetadataList
        .filter((font: GoogleFontFamily) => 
          font.isOpenSource && 
          !font.isBrandFont && 
          font.subsets.includes("latin") &&
          font.popularity > 0
        )
        .sort((a: GoogleFontFamily, b: GoogleFontFamily) => a.popularity - b.popularity)
        //.slice(0, 1000) // Limit to top 500 most popular fonts
      
      const fontNames = filteredFonts.map((font: GoogleFontFamily) => font.family)
        
        setState({
        fonts: filteredFonts,
        loading: false,
        error: null,
        fontNames,
      })
      
    } catch (error) {
      console.error("Failed to fetch Google Fonts:", error)
      setState({
        fonts: [],
        loading: false,
        error: error instanceof Error ? error.message : "Failed to fetch fonts",
        fontNames: GOOGLE_FONTS, // Use fallback
      })
    }
  }, [])

  useEffect(() => {
    fetchGoogleFonts()
  }, [fetchGoogleFonts])

  const getFontsByCategory = useCallback((category: string) => {
    return state.fonts.filter(font => font.category === category)
  }, [state.fonts])

  const getFontByName = useCallback((name: string) => {
    return state.fonts.find(font => font.family === name)
  }, [state.fonts])

  const getPopularFonts = useCallback((limit: number = 20) => {
    return state.fonts.slice(0, limit)
  }, [state.fonts])

  const searchFonts = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return state.fonts.filter(font =>
      font.family.toLowerCase().includes(lowercaseQuery) ||
      font.displayName?.toLowerCase().includes(lowercaseQuery) ||
      font.category.toLowerCase().includes(lowercaseQuery)
    )
  }, [state.fonts])

  const retry = useCallback(() => {
    fetchGoogleFonts()
  }, [fetchGoogleFonts])

  return {
    ...state,
    getFontsByCategory,
    getFontByName,
    getPopularFonts,
    searchFonts,
    retry,
  }
} 