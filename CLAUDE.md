# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server on http://localhost:3000
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Overview

**Fontsy** is a Next.js 15.2.4 application for generating logos using Google Fonts. It's a single-page application with real-time preview and export capabilities.

## Architecture

### Core Structure
- **Frontend**: Next.js App Router with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives via shadcn/ui
- **State Management**: React Hooks (useLogoGenerator custom hook)
- **Font Loading**: Google Fonts API integration
- **Export**: PNG/SVG generation with canvas API

### Key Files

#### State Management
- `hooks/use-logo-generator.ts:6` - Central hook managing all logo configuration state
- `lib/constants.ts:64` - Default configuration values and presets
- `lib/types.ts:18` - TypeScript interfaces for logo configuration

#### Core Logic
- `lib/logo-utils.ts:4` - Font loading, PNG/SVG generation, download utilities
- `hooks/use-google-fonts.ts` - Google Fonts API integration (not found in current codebase)

#### Components
- `app/page.tsx:11` - Main application page with tabbed interface
- `components/base/` - Core logo generator components (TextSettings, StyleSettings, ExportSettings, PreviewPanel)
- `components/ui/` - Reusable UI components (Radix UI based)

### Data Flow
1. User input → `useLogoGenerator` hook state
2. State changes → Real-time preview updates via `PreviewPanel`
3. Export triggers → Canvas/SVG generation → File download

### Key Features
- **Google Fonts Integration**: Dynamic font loading via Google Fonts API
- **Real-time Preview**: Instant visual feedback for all changes
- **Export Formats**: PNG (canvas-based) and SVG generation
- **Responsive Design**: Mobile-first with adaptive preview sizing
- **Flexible Sizing**: Custom resolutions and aspect ratio locking

### API Routes
- `app/api/google-fonts/route.ts` - Google Fonts API proxy (if exists)

### Configuration
- **Default Font**: Inter
- **Export Presets**: Favicon, OG images, custom sizes
- **Color Presets**: 16 predefined colors
- **Supported Formats**: PNG, SVG