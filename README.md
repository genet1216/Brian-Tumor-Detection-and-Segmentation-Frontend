# 🧠 Brain Tumor Detection - Frontend

A modern, responsive React application for brain tumor detection and analysis using AI. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Features

- **AI-Powered Tumor Detection**: Upload MRI scans and get instant tumor classification
- **Advanced Visualization**: 3D brain visualization and tumor segmentation analysis
- **User Authentication**: Secure login and registration system
- **Real-time Analysis**: Live tumor detection with confidence scores
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Modern UI/UX**: Built with shadcn/ui components and Framer Motion
- **Interactive Dashboard**: Comprehensive analysis results and case studies

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **UI Components**: Radix UI primitives
- **Animations**: Framer Motion
- **3D Graphics**: Three.js with React Three Fiber
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form + Zod validation
- **Routing**: React Router DOM
- **Icons**: Lucide React + React Icons

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (see Backend README)

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   VITE_APP_NAME=Brain Tumor Detection
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

## 🏗️ Project Structure

```
Frontend/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── AuthModal.tsx  # Authentication modal
│   │   ├── Header.tsx     # Navigation header
│   │   └── Footer.tsx     # Footer component
│   ├── sections/          # Page sections
│   │   ├── Hero.tsx       # Landing hero section
│   │   ├── Features.tsx   # Features showcase
│   │   ├── analysis.tsx   # Analysis interface
│   │   └── ...           # Other sections
│   ├── services/          # API services
│   │   └── authService.ts # Authentication service
│   ├── types/             # TypeScript type definitions
│   ├── lib/               # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Key Components

### Authentication System
- Secure login/registration with JWT tokens
- Protected routes and user sessions
- Form validation with Zod schemas

### Tumor Analysis Interface
- Drag & drop file upload for MRI scans
- Real-time processing with progress indicators
- Detailed results with confidence scores
- Tumor segmentation visualization

### 3D Brain Visualization
- Interactive 3D brain model using Three.js
- Tumor location highlighting
- Zoom, rotate, and pan controls

### Dashboard
- User profile management
- Analysis history
- Case studies and examples
- Performance metrics

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🌐 API Integration

The frontend communicates with the Django backend API:

- **Authentication**: `/api/auth/register/`, `/api/auth/login/`
- **Tumor Analysis**: `/api/analyze/`
- **User Management**: `/api/users/`

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible components:

- **Forms**: Input, Select, Checkbox, Radio Group
- **Navigation**: Tabs, Accordion, Breadcrumb
- **Feedback**: Toast, Alert, Progress
- **Layout**: Card, Sheet, Dialog, Modal
- **Data Display**: Table, Badge, Avatar

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔒 Security Features

- JWT token authentication
- Secure API communication
- Input validation and sanitization
- Protected routes
- CSRF protection

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@braintumordetection.com or create an issue in the repository.

## 🔗 Links

- [Backend Repository](../Backend/README.md)
- [Live Demo](https://your-demo-url.com)
- [Documentation](https://your-docs-url.com)

---

**Built with ❤️ for better healthcare through AI**
