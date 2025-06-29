# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js-based generative art journal and portfolio website built with TypeScript. The site showcases creative coding projects using p5.js, articles, and software projects. Content is managed through MDX files with frontmatter.

## Development Commands

### Essential Commands
- `yarn dev` - Start development server
- `yarn build` - Build for production (includes sitemap generation)
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn check-types` - Run TypeScript type checking
- `yarn format` - Auto-fix linting and format code with Prettier

### Build & Analysis
- `yarn build-stats` - Build with bundle analysis
- `yarn build-prod` - Clean build for production
- `yarn clean` - Remove build artifacts

### Git Workflow
- `yarn commit` - Use conventional commits with Commitizen
- Pre-commit hooks run linting and type checking via Husky

## Architecture

### Content Management
The site uses a file-based content system with three main content types:
- **Articles** (`src/content/articles/*.mdx`) - Blog posts and technical articles
- **Drawings** (`src/content/drawings/*.mdx`) - Interactive p5.js sketches with descriptions
- **Projects** (`src/content/projects/*.md`) - Software project showcases

Content utilities in `src/utils/mdx.ts` handle MDX parsing, frontmatter extraction, and slug generation.

### p5.js Integration
Interactive sketches are managed through a custom architecture:
- `src/components/p5/Sketch.tsx` - Main wrapper component for p5.js sketches
- `src/hooks/p5.ts` - Custom hook for p5.js lifecycle management
- `src/sketch/` - Individual sketch implementations
- Sketches receive props for dimensions, dark mode, and fullscreen support

### Routing & Pages
- `/blog/[slug]` - Dynamic routing for articles
- `/drawings/[slug]` - Dynamic routing for interactive sketches
- `/software/[slug]` - Dynamic routing for project showcases
- Pages use Next.js static generation with `getStaticProps` and `getStaticPaths`

### Styling & Theming
- Tailwind CSS with custom configuration in `tailwind.config.js`
- Dark/light mode support via `src/hooks/darkMode.ts`
- Theme colors defined in `src/config/theme.ts`
- Custom fonts: Kanit (sans-serif), Bodoni Moda (serif)

### Configuration
- App-wide settings in `src/utils/AppConfig.ts` (SEO, URLs, social profiles)
- Path aliases: `@/*` maps to `src/*`, `@/public/*` maps to `public/*`
- Static export configuration for GitHub Pages deployment

### Audio Integration
- RNBO (Cycling '74) integration for web audio projects
- Audio patches stored in `public/assets/patches/`

## Key Dependencies
- **Next.js 13** - React framework with MDX support
- **p5.js & react-p5** - Creative coding and generative art
- **@rnbo/js** - Web audio framework
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Type safety with strict configuration
- **gray-matter** - Frontmatter parsing for content files

## Development Notes
- TypeScript configuration is strict with comprehensive linting rules
- Bundle analysis available via `ANALYZE=true` environment variable
- Sitemap automatically generated on build
- Google Analytics integration via `src/utils/googleAnalytics.ts`