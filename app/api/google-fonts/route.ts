import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('https://fonts.google.com/metadata/fonts', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400', // Cache for 1 hour, stale-while-revalidate for 24 hours
      }
    })
  } catch (error) {
    console.error('Failed to fetch Google Fonts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Google Fonts' },
      { status: 500 }
    )
  }
} 