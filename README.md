# Meme Viewer Pro 🎭

A modern, interactive meme viewer built with React, Tailwind CSS, and deployed on AWS S3.

## Features

- 🖼️ **Interactive Meme Carousel**: Navigate through a curated collection of popular memes
- ❤️ **Like System**: Show appreciation for your favorite memes with likes
- 🎯 **Grid View**: Quick access to all memes with thumbnail previews
- 🎨 **Beautiful UI**: Gradient backgrounds and smooth animations using Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks for state management
- **Vite**: Lightning-fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **AWS S3**: Static website hosting with global accessibility

## Meme Collection

The app features 6 iconic internet memes:
1. Distracted Boyfriend
2. Drake Hotline Bling
3. Two Buttons
4. Mocking SpongeBob
5. Change My Mind
6. Batman Slapping Robin

## Live Demo

🌐 **[View Live App](http://meme-viewer-desmond-2025.s3-website-us-east-1.amazonaws.com)**

## Local Development

### Prerequisites

- Node.js 16+ and npm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/DarrylClay2005/meme-viewer-s3.git
cd meme-viewer-s3

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Deployment to AWS S3

### Setup S3 Bucket

1. Create an S3 bucket with a unique name
2. Enable static website hosting
3. Disable "Block all public access"
4. Add a bucket policy for public read access:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

### Deploy

```bash
# Build the app
npm run build

# Sync to S3 bucket
aws s3 sync ./dist s3://your-bucket-name --delete
```

Your app will be available at:
`http://your-bucket-name.s3-website-[region].amazonaws.com`

## Project Structure

```
meme-viewer-s3/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Tailwind CSS imports
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## Key Components

### App.jsx

The main component featuring:
- State management for current meme index and likes
- Navigation controls (Previous/Next buttons)
- Like functionality with persistent count
- Grid view for meme selection
- Responsive layout with Tailwind classes

## Learning Objectives Met

✅ Scaffolded React project with Vite  
✅ Integrated TailwindCSS for styling  
✅ Built interactive components (carousel, likes, grid)  
✅ Configured AWS S3 bucket for static hosting  
✅ Deployed React build to S3  

## Screenshots

The app features:
- A beautiful gradient background (purple → pink → red)
- Large meme display with navigation counter
- Interactive like button with emoji
- Previous/Next navigation buttons
- Responsive grid of all memes with selection highlighting
- Clean, modern design with shadow effects and hover animations

## Author

**DarrylClay2005**  
Email: dclay2581@gmail.com

## License

This project is open source and available for educational purposes.

## Acknowledgments

- Meme images sourced from [imgflip.com](https://imgflip.com)
- Built as part of AWS S3 deployment learning objectives
- React and Tailwind CSS communities for excellent documentation
