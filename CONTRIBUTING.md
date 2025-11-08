# Contributing to Meme Viewer Pro

Thank you for your interest in contributing to Meme Viewer Pro! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 16 or higher
- npm 7 or higher
- Git
- AWS CLI (for deployment)

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/meme-viewer-s3.git
   cd meme-viewer-s3
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Entry point
└── index.css        # Tailwind CSS imports
```

## Code Style

- Use functional components with React hooks
- Follow ESLint configuration
- Use Tailwind CSS utility classes for styling
- Keep components clean and well-documented

## Adding New Memes

To add a new meme to the collection:

1. Add the meme object to the `memes` array in `App.jsx`:
   ```javascript
   {
     id: 7,
     title: "Your Meme Name",
     url: "https://i.imgflip.com/MEME_ID.jpg",
     description: "Brief description"
   }
   ```

2. Test locally to ensure it displays correctly
3. Commit with a descriptive message:
   ```bash
   git commit -m "feat: Add [Meme Name] to collection"
   ```

## Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test thoroughly
4. Commit with conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `chore:` for maintenance tasks

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## Testing

Before submitting:

1. Ensure the app builds successfully:
   ```bash
   npm run build
   ```

2. Test all interactive features:
   - Meme navigation (Previous/Next)
   - Like functionality
   - Grid view selection
   - Responsive design on different screen sizes

## Deployment

The app is deployed to AWS S3. After merging changes:

1. Build the app:
   ```bash
   npm run build
   ```

2. Deploy to S3:
   ```bash
   aws s3 sync ./dist s3://meme-viewer-desmond-2025 --delete
   ```

## Questions?

Feel free to open an issue for any questions or suggestions!
