# Agri Advisor Web Platform

A responsive, multilingual agricultural website for small Indian farmers (<2 hectares), providing crop advice, soil and irrigation analytics, and efficient backend data structures.

## 🌾 Overview

Agri Advisor Web Platform is designed to empower small and marginal farmers in India by providing personalized, science-backed agricultural advice through an accessible web interface. The platform combines modern web technologies with traditional farming knowledge to deliver practical, actionable recommendations.

### Key Features

- **Responsive Web Design**: Optimized for desktop, tablet, and mobile devices
- **Multilingual Support**: Hindi, English, Tamil, Telugu, Marathi, Kannada, Bengali
- **Accessibility First**: Keyboard navigation, large click targets, visual and audio guides
- **Multiple Input Modes**: Text, voice, and image input support
- **Comprehensive Advisory**: Crop recommendations, fertilizer plans, pest management
- **Printable Outputs**: Downloadable calendars and guides
- **Real-time Alerts**: Weather and market price notifications
- **AI Integration**: Soil testing and pest detection through image analysis

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Internationalization**: next-i18next for multilingual support
- **Forms**: React Hook Form with Zod validation
- **Maps**: Leaflet for location selection
- **Charts**: Recharts for data visualization

### Backend
- **API**: Next.js API routes
- **Endpoints**: RESTful API for farmer data, advisory generation, soil testing, pest detection
- **Storage**: SQL database (cloud or local)
- **Security**: Data encryption and user access control
- **Integrations**: Pest AI (Plantix, Tumaini, Agrio), Weather API, Market API

### Core Modules

1. **Farmer Registration & Profile Management**
   - User registration and authentication
   - Language and contact preferences
   - Location and land details

2. **Input Collection System**
   - Multi-step form with validation
   - Location selection with map integration
   - Land area, soil type, water availability
   - Budget, timeline, and risk preferences
   - Past crop history tracking

3. **Advisory Engine**
   - Crop recommendation algorithm
   - Suitability scoring system
   - Fertilizer and pest management schedules
   - Crop calendar generation
   - Cost-benefit analysis

4. **AI-Powered Features**
   - Soil type detection from photos
   - Pest and disease identification
   - Automated recommendations

5. **Alert System**
   - Weather alerts and warnings
   - Market price notifications
   - Pest outbreak alerts

## 🚀 Getting Started

### Prerequisites

- Node.js (>=18.0.0)
- npm or yarn
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd agri-advisor-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

## 📁 Project Structure

```
├── components/          # React components
│   ├── forms/          # Form components
│   ├── ui/             # UI components
│   ├── charts/         # Chart components
│   └── layout/         # Layout components
├── pages/              # Next.js pages and API routes
│   ├── api/            # API endpoints
│   │   ├── farmer/     # Farmer-related APIs
│   │   ├── advisory/   # Advisory generation APIs
│   │   ├── soil/       # Soil testing APIs
│   │   ├── pest/       # Pest detection APIs
│   │   └── alerts/     # Alert APIs
│   └── index.tsx       # Home page
├── lib/                # Utility functions and configurations
│   ├── api/            # API client functions
│   ├── utils/          # Helper functions
│   ├── hooks/          # Custom React hooks
│   └── constants/      # Application constants
├── public/             # Static assets
│   ├── locales/        # Translation files
│   ├── images/         # Images and icons
│   └── favicon.ico     # Favicon
├── styles/             # Global styles
├── types/              # TypeScript type definitions
└── next.config.js      # Next.js configuration
```

## 🌍 Internationalization

The platform supports multiple Indian languages with full localization:

- **Hindi** (हिन्दी) - Default language
- **English**
- **Tamil** (தமிழ்)
- **Telugu** (తెలుగు)
- **Marathi** (मराठी)
- **Kannada** (ಕನ್ನಡ)
- **Bengali** (বাংলা)

Language files are located in `public/locales/` and use the next-i18next framework.

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Large Click Targets**: Buttons and links sized for easy clicking
- **Visual & Audio Guides**: Visual indicators and audio support
- **High Contrast**: Clear visual distinction between elements
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Responsive Design**: Works on all device sizes

## 📱 Responsive Design

The platform is fully responsive and optimized for:

- **Desktop**: Full-featured experience with all capabilities
- **Tablet**: Touch-optimized interface with adapted layouts
- **Mobile**: Streamlined experience for small screens

## 🔧 API Endpoints

### Farmer Management
- `POST /api/farmer/register` - Register new farmer
- `POST /api/farmer/input` - Submit farmer inputs

### Advisory Services
- `POST /api/advisory/generate` - Generate crop advisory
- `POST /api/soil/test` - Analyze soil from image
- `POST /api/pest/detect` - Identify pests from image

### Alerts
- `GET /api/alerts/weather` - Get weather alerts
- `GET /api/alerts/market` - Get market price alerts

## 📊 Data Models

### FarmerProfile
```typescript
{
  userId: string;
  language: string;
  contactMode: string;
  location: Location;
  landArea: LandArea;
  soilType: SoilType;
  waterAvailability: WaterAvailability;
  budgetINR: number;
  timelineDays: number;
  laborCount: number;
  riskPreference: string;
  pastCropHistory?: PastCropHistory[];
}
```

### AdvisoryOutput
```typescript
{
  recommendedCrops: RecommendedCrop[];
  fertilizerPlan: FertilizerPlan[];
  pestSchedule: PestSchedule[];
  cropCalendar: CropCalendar[];
}
```

## 🧪 Test Cases

The platform includes comprehensive test cases covering:

1. **Multilingual Voice Input**: Farmer uses browser on mobile with Hindi voice input
2. **Soil Photo Analysis**: Unknown soil type with photo upload for AI analysis
3. **Budget Constraints**: Limited budget with 90-day harvest window
4. **Printable Outputs**: Downloadable calendar for field helpers

## 🔒 Security & Privacy

- **Data Encryption**: All sensitive data encrypted
- **User Access Control**: Farmer-only data access by default
- **Secure API**: Protected endpoints with validation
- **Privacy First**: Minimal data collection, maximum utility

## 🌐 External Integrations

### Pest Detection AI
- **Plantix**: Crop disease identification
- **Tumaini**: Pest detection and treatment
- **Agrio**: Agricultural AI services

### Weather Services
- Real-time weather data
- Agricultural alerts
- Seasonal forecasting

### Market Data
- Government price updates
- Agmark integration
- Farmgate price synchronization

## 🎯 User Stories

### Small Farmer (Web User)
**Goal**: Access reliable, locally personalized crop advice using website in preferred language

**Journey**:
1. Select preferred language (Hindi/Tamil/etc.)
2. Enter location and land details
3. Upload soil photo for analysis
4. Specify budget and timeline constraints
5. Receive personalized crop recommendations
6. Download printable calendar and guides

### Agricultural Extension Agent
**Goal**: Monitor, escalate, and assist farmer cases through web dashboard

**Journey**:
1. Access farmer case management interface
2. Review farmer inputs and advisory results
3. Escalate complex cases to experts
4. Provide additional guidance and support

## 🚀 Deployment

### Production Build
```bash
npm run build
npm run start
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
WEATHER_API_KEY=your_weather_api_key
MARKET_API_KEY=your_market_api_key
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 🎯 Roadmap

- [ ] Enhanced AI crop recommendation engine
- [ ] Integration with government agricultural schemes
- [ ] Community features for farmer knowledge sharing
- [ ] Advanced analytics and reporting
- [ ] Progressive Web App (PWA) capabilities
- [ ] Offline functionality with service workers

---

**Built with ❤️ for Indian farmers**