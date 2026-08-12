# Coppola Home

A modern e-commerce website built with React, TypeScript, and Vite, featuring a comprehensive catalog of home improvement products including flooring, vanities, toilets, and more.

## Tech Stack

- React 
- TypeScript
- Vite
- Tailwind CSS
- RemixIcon

## Project Structure

```
project/
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/        # Page components and routes
│   ├── layouts/      # Layout components
│   ├── config/       # Configuration files
│   ├── types/        # TypeScript type definitions
│   └── assets/       # Static assets
├── public/           # Public static files
└── dist/            # Production build output
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## How to Run

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The build output will be in the `dist` directory.

## Development Tools

- ESLint for code linting
- PostCSS for CSS processing
- Tailwind for utility-first CSS

## Additional Documentation

- [Admin Guide](./ADMIN_README.md)
- [Contact Form Integration](./CONTACT_FORM_INTEGRATION.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)