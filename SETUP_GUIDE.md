# Veritron AI - Application Setup & Building Guide

## Project Structure
This project contains two applications:
1. **veritron-extension** - Chrome browser extension for analyzing content authenticity
2. **veritron-web** - Next.js web application for viewing and sharing analysis reports

## Prerequisites
- Node.js 18+ and npm
- Google Gemini API Key (for content analysis)
- Supabase account with credentials already configured

## Setup Instructions

### 1. Environment Configuration

All environment variables are already configured in the `.env` files:
- **veritron-extension/.env** - Contains Gemini API key and Supabase credentials
- **veritron-web/.env** - Contains Supabase credentials for the web app

**Note:** If you need to add a real Gemini API key, update `VITE_GEMINI_API_KEY` in `veritron-extension/.env`

### 2. Install Dependencies

For the extension:
```bash
cd veritron-extension
npm install
```

For the web app:
```bash
cd veritron-web
npm install
```

### 3. Building the Application

**Build the extension:**
```bash
cd veritron-extension
npm run build
```
Output will be in `veritron-extension/dist/`

**Build the web app:**
```bash
cd veritron-web
npm run build
```

### 4. Development

**Development for extension:**
```bash
cd veritron-extension
npm run dev
```

**Development for web app:**
```bash
cd veritron-web
npm run dev
```

### 5. Loading the Extension in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode" (top right)
3. Click "Load unpacked"
4. Select the `veritron-extension/dist` folder
5. The extension should now appear in your Chrome toolbar

## Architecture

### Extension Features
- Analyzes web page content using Google Gemini AI
- Checks authenticity of news articles and social media posts
- Scrapes page content (HTML, text, links, images) based on user options
- Stores analysis results in Supabase database
- Allows users to share verified information to the web app

### Web App Features
- Displays analysis reports from the extension
- Shows news item verification status and detailed findings
- User authentication via Supabase
- Responsive design with dark/light theme support
- News feed and individual post pages

## Key Fixes Applied

1. **Environment Variables** - Fixed extension to use Vite's import.meta.env for build-time variables
2. **Supabase Client** - Simplified client creation to use environment variables directly
3. **Background Script** - Removed incorrect runtime environment variable access
4. **API Integration** - Verified Gemini AI client configuration

## API Integration

### Google Gemini
- Used for content authenticity analysis
- Performs web searches to verify information
- Returns structured analysis with confidence scores

### Supabase
- PostgreSQL database for storing news articles
- Authentication and real-time updates
- Row-level security for data protection

## Troubleshooting

### Missing Env Variables
If you see errors about missing environment variables:
1. Check that `.env` files exist in both project directories
2. Verify the values match your Supabase project settings
3. Rebuild the extension: `npm run build`

### Extension Not Loading
1. Ensure the build completed successfully (`dist` folder exists)
2. Check Chrome DevTools console for errors
3. Reload the extension from `chrome://extensions`

### Build Failures
1. Clear node_modules: `rm -rf node_modules` (or `rmdir /s node_modules` on Windows)
2. Reinstall dependencies: `npm install`
3. Try building again: `npm run build`

## Next Steps
1. Install dependencies in both directories
2. Update Gemini API key if needed
3. Build the extension
4. Load the extension in Chrome
5. Start the web app in development mode
6. Test the full workflow

