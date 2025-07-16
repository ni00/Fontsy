# Fontsy - Google Fonts Logo Generator

A modern, responsive logo generator built with Next.js that lets you create beautiful logos using Google Fonts.

## Features

- **Google Fonts Integration**: Access thousands of fonts from Google Fonts
- **Real-time Preview**: See your logo changes instantly
- **Customizable Styling**: Adjust text color, background, transparency, and border radius
- **Multiple Export Formats**: Export as PNG or SVG
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Flexible Sizing**: Custom resolution support with preset options

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ni00/Fontsy.git
cd Fontsy
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Text Tab**: Enter your text and select font family, size, and color
2. **Style Tab**: Customize background color, transparency, and border radius
3. **Export Tab**: Choose resolution and format, then download your logo

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── page.tsx           # Main page component
├── components/            # Reusable components
│   ├── base/             # Core logo generator components
│   └── ui/               # UI components (Radix UI)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and types
└── styles/               # Global styles
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 