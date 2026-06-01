# Kimaya Ashram Charitable Trust - Management System

A modern, responsive web application built with Next.js for managing donations and operations of Kimaya Ashram Charitable Trust. This application provides a comprehensive dashboard for donors to make contributions and for administrators to track and manage all trust activities.

## 🚀 Features

- **Professional Dashboard**: Clean, modern dashboard with sidebar navigation
- **Donation Management**: Secure and validated donation submission with real-time tracking
- **Donor Management**: Complete donor database with contribution history
- **Reports & Analytics**: Comprehensive reporting system with tax exemption certificates
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Real-time Validation**: Client-side form validation with user-friendly error messages
- **Professional UI**: Clean, modern interface built with Tailwind CSS and orange theme
- **Type Safety**: Full TypeScript support for better development experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16.2.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Hooks
- **HTTP Client**: Fetch API
- **Form Handling**: Custom hooks with validation
- **Linting**: ESLint with Next.js configuration

## 🏠 Dashboard Sections

### 1. **Home**
- Welcome message and donation form
- Quick donation submission
- Trust information and mission

### 2. **Donors**
- Complete donor database
- Donor contact information and history
- Total contributions per donor
- Donor management actions

### 3. **Donations**
- All donation records with detailed information
- Status tracking (Pending, Completed, Failed, Cancelled)
- Payment mode and transaction details
- Donation history and analytics

### 4. **Reports**
- Monthly and annual donation reports
- Tax exemption (80G) certificate generation
- Donor analytics and contribution patterns
- Financial summaries and insights

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── donations/         # Donations listing page
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components (Button, Input, etc.)
│   ├── forms/            # Form components
│   └── layout/           # Layout components
├── features/             # Feature-specific components
│   └── donations/        # Donation-related components
├── hooks/                # Custom React hooks
├── services/             # API services and HTTP client
├── types/                # TypeScript type definitions
├── utils/                # Utility functions
└── constants/            # Application constants
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20.9.0 or higher
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ashram-donation-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update the `.env.local` file with your configuration:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   NEXT_PUBLIC_APP_NAME="Ashram Donation Management"
   NEXT_PUBLIC_APP_VERSION="1.0.0"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 UI Components

### Basic Components
- **Button**: Customizable button with variants and loading states
- **Input**: Form input with validation and error handling
- **Select**: Dropdown select component
- **Card**: Container component for content sections

### Form Components
- **DonationForm**: Complete donation submission form with validation

### Layout Components
- **Layout**: Main application layout with header and navigation

## 🔌 API Integration

The application integrates with the backend API through:

- **DonationService**: Handles donation-related API calls
- **ApiClient**: Generic HTTP client for API requests
- **Custom Hooks**: React hooks for data fetching and state management

### API Endpoints

- `POST /api/donations/processunifieddonation` - Submit new donation
- `GET /api/donations` - Fetch all donations
- `GET /api/donations/{id}` - Fetch specific donation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔒 Form Validation

Comprehensive client-side validation includes:
- **Email**: Valid email format
- **Phone**: 10-digit Indian mobile number
- **PAN**: Valid PAN number format (ABCDE1234F)
- **Amount**: Minimum and maximum donation limits
- **Required Fields**: All mandatory field validation

## 🎯 Key Features

### Donation Form
- Multi-step validation
- Real-time error feedback
- Payment mode selection
- Success confirmation with transaction ID

### Donations List
- Tabular view of all donations
- Status indicators with color coding
- Formatted currency and date display
- Loading and error states

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Environment Variables for Production
Ensure all environment variables are properly set in your production environment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team

## 🔄 Version History

- **v1.0.0** - Initial release with donation form and listing functionality