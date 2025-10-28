# 🌾 Agri Advisor Web Platform

<div align="center">

![Agri Advisor Logo](https://img.shields.io/badge/Agri-Advisor-green?style=for-the-badge&logo=leaf)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

**A responsive, multilingual agricultural advisory platform designed specifically for small Indian farmers**

[🚀 Live Demo](#-live-demo) • [📖 Documentation](#-documentation) • [🛠️ Installation](#-installation) • [🤝 Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Live Demo](#-live-demo)
- [📦 Installation](#-installation)
- [🏗️ Project Structure](#️-project-structure)
- [🌐 API Endpoints](#-api-endpoints)
- [🎨 UI Components](#-ui-components)
- [🌍 Internationalization](#-internationalization)
- [♿ Accessibility](#-accessibility)
- [📱 Responsive Design](#-responsive-design)
- [🔧 Configuration](#-configuration)
- [🚀 Deployment](#-deployment)
- [📊 Performance](#-performance)
- [🧪 Testing](#-testing)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)

---

## 🌟 Overview

Agri Advisor is a comprehensive web platform that provides personalized agricultural advisory services to small-scale Indian farmers. Built with modern web technologies, it offers multilingual support, responsive design, and accessibility features to ensure farmers across India can access valuable agricultural guidance.

### 🎯 Mission
To democratize agricultural knowledge and provide accessible, personalized farming advice to small Indian farmers through technology.

### 🎯 Vision
Empowering every farmer with data-driven agricultural insights, regardless of their location, language, or technical expertise.

---

## ✨ Features

### 🌐 **Multilingual Support**
- **7 Languages**: Hindi, English, Tamil, Telugu, Marathi, Kannada, Bengali
- **RTL Support**: Right-to-left text rendering for appropriate languages
- **Dynamic Language Switching**: Seamless language changes without page reload

### 📝 **Comprehensive Farmer Input Form**
- **Location Details**: Village, state, district with automatic coordinate detection
- **Land Information**: Area measurement with multiple units
- **Soil Analysis**: Texture, photo upload, lab test integration, NPK values
- **Water Resources**: Availability, depth, frequency, irrigation options
- **Financial Planning**: Budget allocation and timeline management
- **Labor Management**: Workforce planning and optimization
- **Risk Assessment**: Preference-based risk tolerance evaluation

### 🤖 **AI-Powered Advisory System**
- **Personalized Recommendations**: Based on farmer's specific inputs
- **Crop Selection**: Optimal crop suggestions for local conditions
- **Fertilizer Guidance**: NPK recommendations based on soil analysis
- **Irrigation Planning**: Water management strategies
- **Pest Control**: Integrated pest management solutions
- **Market Insights**: Price trends and market timing

### 📊 **Real-Time Alerts**
- **Weather Alerts**: Rainfall, temperature, and climate warnings
- **Market Prices**: Live commodity price updates
- **Pest Outbreaks**: Disease and pest infestation alerts
- **Government Schemes**: Policy updates and subsidy information

### ♿ **Accessibility Features**
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast Mode**: Enhanced visibility options
- **Large Click Targets**: Touch-friendly interface
- **Voice Input**: Speech-to-text capabilities (planned)

### 📱 **Responsive Design**
- **Mobile-First**: Optimized for smartphones
- **Tablet Support**: Enhanced tablet experience
- **Desktop Optimization**: Full desktop functionality
- **Progressive Web App**: Offline capabilities (planned)

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 15.0 with App Router
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 3.0
- **UI Components**: Custom React components
- **State Management**: React Hooks (useState, useCallback, useMemo)
- **Form Handling**: React Hook Form with validation
- **Icons**: Lucide React

### **Backend**
- **API**: Next.js API Routes
- **Database**: MongoDB (planned)
- **Authentication**: NextAuth.js (planned)
- **File Upload**: Cloudinary integration (planned)

### **Development Tools**
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Package Manager**: npm
- **Version Control**: Git

### **Deployment**
- **Hosting**: Vercel (recommended)
- **CDN**: Vercel Edge Network
- **Domain**: Custom domain support
- **SSL**: Automatic HTTPS

---

## 🚀 Live Demo

<div align="center">

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Visit_Site-blue?style=for-the-badge)](https://agri-advisor-demo.vercel.app)

**Experience the platform**: [agri-advisor-demo.vercel.app](https://agri-advisor-demo.vercel.app)

</div>

### 🎬 Demo Features
- **Language Selection**: Try switching between different Indian languages
- **Form Completion**: Experience the comprehensive farmer input process
- **Responsive Design**: Test on different screen sizes
- **Accessibility**: Navigate using only keyboard

---

## 📦 Installation

### Prerequisites
- **Node.js**: Version 18.0 or higher
- **npm**: Version 8.0 or higher
- **Git**: For version control

### Quick Start

```bash
# Clone the repository
git clone https://github.com/your-username/agri-advisor-web.git
cd agri-advisor-web

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Detailed Setup

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-username/agri-advisor-web.git
   cd agri-advisor-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |

---

## 🏗️ Project Structure

```
agri-advisor-web/
├── 📁 components/                 # Reusable UI components
│   ├── 📁 forms/                 # Form components
│   │   └── FarmerForm.tsx        # Main farmer input form
│   └── 📁 ui/                    # UI components
│       ├── LanguageSelector.tsx   # Language selection
│       ├── AdvisoryResults.tsx   # Results display
│       ├── AlertComponent.tsx    # Alert system
│       ├── ErrorBoundary.tsx     # Error handling
│       ├── MapComponent.tsx      # Location selection
│       └── ImageUpload.tsx        # File upload
├── 📁 pages/                     # Next.js pages
│   ├── api/                      # API routes
│   │   ├── farmer/              # Farmer-related endpoints
│   │   ├── advisory/            # Advisory generation
│   │   ├── soil/                # Soil analysis
│   │   ├── pest/                # Pest detection
│   │   └── alerts/              # Alert system
│   ├── _app.tsx                 # App wrapper
│   ├── _document.tsx            # Document wrapper
│   └── index.tsx                # Home page
├── 📁 public/                   # Static assets
│   ├── 📁 locales/              # Translation files
│   │   ├── en/                  # English translations
│   │   ├── hi/                  # Hindi translations
│   │   ├── ta/                  # Tamil translations
│   │   ├── te/                  # Telugu translations
│   │   ├── mr/                  # Marathi translations
│   │   ├── kn/                  # Kannada translations
│   │   └── bn/                  # Bengali translations
│   └── images/                  # Image assets
├── 📁 styles/                   # Global styles
│   └── globals.css              # Global CSS with Tailwind
├── 📁 types/                    # TypeScript type definitions
│   └── index.ts                 # Main type definitions
├── 📄 package.json              # Dependencies and scripts
├── 📄 next.config.js            # Next.js configuration
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 tsconfig.json             # TypeScript configuration
├── 📄 next-i18next.config.js   # i18n configuration
└── 📄 README.md                 # This file
```

---

## 🌐 API Endpoints

### Farmer Management
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/farmer/register` | POST | Register new farmer |
| `/api/farmer/input` | POST | Submit farmer inputs |
| `/api/farmer/profile` | GET | Get farmer profile |

### Advisory System
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/advisory/generate` | POST | Generate personalized advisory |
| `/api/advisory/history` | GET | Get advisory history |

### Analysis Services
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/soil/test` | POST | Analyze soil sample |
| `/api/pest/detect` | POST | Detect pests from image |
| `/api/weather/forecast` | GET | Get weather forecast |

### Alert System
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/alerts/weather` | GET | Weather alerts |
| `/api/alerts/market` | GET | Market price alerts |

### Example API Usage

```typescript
// Generate advisory
const response = await fetch('/api/advisory/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    userId: 'farmer-123',
    farmerInputs: {
      location: { village: 'Sample Village', state: 'Karnataka' },
      landArea: { value: 2, unit: 'acres' },
      // ... other inputs
    },
  }),
});

const advisory = await response.json();
```

---

## 🎨 UI Components

### Core Components

#### `FarmerForm`
Comprehensive multi-step form for collecting farmer information.

```tsx
<FarmerForm
  onSubmit={handleSubmit}
  initialData={farmerData}
  isLoading={false}
/>
```

#### `LanguageSelector`
Interactive language selection with visual indicators.

```tsx
<LanguageSelector
  onLanguageChange={handleLanguageChange}
  currentLanguage="hi"
/>
```

#### `AdvisoryResults`
Display personalized advisory results with download options.

```tsx
<AdvisoryResults
  advisory={advisoryData}
  onDownload={handleDownload}
  onPrint={handlePrint}
/>
```

### Component Features
- **TypeScript**: Full type safety
- **Accessibility**: ARIA labels and keyboard navigation
- **Responsive**: Mobile-first design
- **Internationalized**: Multi-language support
- **Error Handling**: Graceful error states

---

## 🌍 Internationalization

### Supported Languages
- **हिन्दी** (Hindi) - Default
- **English** (English)
- **தமிழ்** (Tamil)
- **తెలుగు** (Telugu)
- **मराठी** (Marathi)
- **ಕನ್ನಡ** (Kannada)
- **বাংলা** (Bengali)

### Translation Structure
```json
{
  "welcome": "स्वागत है",
  "locationDetails": "स्थान का विवरण",
  "landArea": "भूमि का क्षेत्रफल",
  "soilType": "मिट्टी का प्रकार",
  "waterAvailability": "पानी की उपलब्धता",
  "budget": "बजट",
  "timeline": "समय सीमा",
  "labor": "श्रम",
  "riskPreference": "जोखिम प्राथमिकता"
}
```

### Adding New Languages
1. Create new locale directory: `public/locales/[lang]/`
2. Add translation file: `common.json`
3. Update `next.config.js` locales array
4. Add language option to `LanguageSelector`

---

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: High contrast ratios
- **Focus Management**: Visible focus indicators
- **Alternative Text**: Descriptive alt text for images

### Accessibility Features
```tsx
// Example accessible button
<button
  className="px-4 py-2 bg-primary-600 text-white rounded-md"
  aria-label="Submit farmer information"
  onClick={handleSubmit}
>
  Submit
</button>
```

### Testing Accessibility
- **axe-core**: Automated accessibility testing
- **Lighthouse**: Accessibility audits
- **Screen Readers**: NVDA, JAWS, VoiceOver testing

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Mobile-First Approach
```css
/* Mobile first */
.container {
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .container {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
  }
}
```

### Responsive Components
- **Grid Layouts**: Adaptive column counts
- **Navigation**: Collapsible mobile menu
- **Forms**: Stacked on mobile, side-by-side on desktop
- **Images**: Responsive sizing with proper aspect ratios

---

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.agriadvisor.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
DATABASE_URL=mongodb://localhost:27017/agri-advisor
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Next.js Configuration
```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'hi', 'ta', 'te', 'mr', 'kn', 'bn'],
    defaultLocale: 'hi',
    localeDetection: false,
  },
  images: {
    domains: ['localhost', 'api.agriadvisor.com'],
    formats: ['image/webp', 'image/avif'],
  },
};
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          800: '#1e40af',
        },
      },
    },
  },
  plugins: [],
};
```

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### Other Platforms
- **Netlify**: Connect GitHub repository
- **AWS Amplify**: Full-stack deployment
- **Railway**: Simple deployment with database
- **DigitalOcean**: App Platform deployment

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 📊 Performance

### Core Web Vitals
- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Features
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts optimization
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Static generation and ISR

### Performance Monitoring
```bash
# Analyze bundle size
npm run analyze

# Lighthouse audit
npm run lighthouse

# Performance testing
npm run perf
```

---

## 🧪 Testing

### Testing Strategy
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Playwright for user flows
- **Accessibility Tests**: axe-core integration

### Running Tests
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage

# Accessibility tests
npm run test:a11y
```

### Test Examples
```typescript
// Component test
import { render, screen } from '@testing-library/react';
import FarmerForm from '../components/forms/FarmerForm';

test('renders farmer form', () => {
  render(<FarmerForm onSubmit={jest.fn()} />);
  expect(screen.getByText('Location Details')).toBeInTheDocument();
});
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'Add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow Next.js recommended rules
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
Add screenshots if applicable
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Agri Advisor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 Acknowledgments

### Open Source Libraries
- **Next.js**: React framework for production
- **TypeScript**: Typed JavaScript at scale
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Performant forms with easy validation
- **next-i18next**: Internationalization for Next.js

### Inspiration
- **Indian Agricultural Research Institute (IARI)**
- **National Agricultural Extension System**
- **Digital India Initiative**
- **Small farmers across India**

### Contributors
- **Development Team**: Core platform development
- **Agricultural Experts**: Domain knowledge and validation
- **UI/UX Designers**: User experience design
- **Community**: Feedback and testing

---

<div align="center">

### 🌾 Built with ❤️ for Indian Farmers

**Agri Advisor Web Platform** - Empowering agriculture through technology

[⭐ Star this repo](https://github.com/your-username/agri-advisor-web) • [🐛 Report Bug](https://github.com/your-username/agri-advisor-web/issues) • [💡 Request Feature](https://github.com/your-username/agri-advisor-web/issues)

---

**Made with ❤️ in India 🇮🇳**

</div>