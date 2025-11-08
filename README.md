# Meme Viewer Pro

Interactive meme viewer built with React and Tailwind CSS.

## Live Demo

- **S3:** http://meme-viewer-desmond-2025.s3-website-us-east-1.amazonaws.com
- **CloudFront:** (Coming soon)

## Quick Start

```bash
npm install
npm run dev
```

## Deploy

```bash
npm run build
aws s3 sync ./dist s3://meme-viewer-desmond-2025 --delete
```

## Features

- Browse 6 popular memes
- Like your favorites
- Grid view selection
- Responsive design

Built with React + Vite + Tailwind CSS + AWS S3 + CloudFront
