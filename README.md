# Outerra - Premium Outdoor Kitchen Website

A modern, premium Next.js landing page for Outerra outdoor kitchens featuring a clean design with Tailwind CSS.

## Features

- **Home Section**: Hero section with compelling call-to-action
- **Product Categories**: Showcase of 6 main product categories
- **3D Model Configurator**: Interactive placeholder for 3-model configurator
- **Responsive Design**: Fully responsive across all devices
- **Premium Aesthetic**: Clean, modern design with Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
outerra/
├── app/
│   ├── layout.tsx       # Root layout with fonts
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles with Tailwind
├── components/
│   ├── Navigation.tsx   # Navigation bar
│   ├── Hero.tsx         # Hero section
│   ├── ProductCategories.tsx  # Product categories section
│   ├── Configurator.tsx # 3D configurator placeholder
│   └── Footer.tsx       # Footer component
├── package.json
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI library

## Customization

The design uses a custom color palette defined in `tailwind.config.ts`:
- Primary colors (green tones)
- Accent colors (red tones)
- Custom fonts (Inter for sans-serif, Playfair Display for serif)

## Build for Production

```bash
npm run build
npm start
```

## License

Private project for Outerra.

