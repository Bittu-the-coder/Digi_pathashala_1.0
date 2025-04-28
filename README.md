# Digi Pathshala - Digital Learning Platform

![Digi Pathshala](screenshot-url-here)

## Overview

Digi Pathshala is a comprehensive digital learning platform that connects students with expert teachers. The platform facilitates online education through live classes, course management, and interactive learning tools.

## Features

### For Students

- Course enrollment and management
- Live class participation
- Progress tracking and attendance monitoring
- Access to learning resources and materials
- Performance analytics
- Personal profile management

### For Teachers/Admins

- Course creation and management
- Live class scheduling and hosting
- Student attendance tracking
- Performance monitoring
- Analytics dashboard
- Resource management

## Tech Stack

- **Frontend**: React.js with Vite
- **UI Framework**: TailwindCSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Additional Libraries**:
  - Chart.js for analytics
  - React Router for navigation
  - React Hot Toast for notifications

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/digi_pathashala_1.0.git
cd digi_pathashala_1.0
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=your_api_url_here
```

## Project Structure

```
src/
├── components/
│   ├── admin/        # Admin-specific components
│   ├── student/      # Student-specific components
│   ├── common/       # Shared components
│   └── auth/         # Authentication components
├── pages/            # Page components
├── context/          # React context files
├── utils/           # Utility functions
└── assets/          # Static assets
```

## Key Features Implementation

### Authentication

- Separate flows for students and teachers
- Secure registration and login process
- Role-based access control

### Course Management

- Create and edit courses
- Module-based course structure
- Progress tracking
- Resource attachments

### Live Classes

- Schedule and manage live sessions
- Real-time attendance tracking
- Interactive features

### Analytics

- Student performance tracking
- Course completion rates
- Attendance statistics
- Engagement metrics

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)
Project Link: [https://github.com/yourusername/digi_pathashala_1.0](https://github.com/yourusername/digi_pathashala_1.0)

## Acknowledgments

- React.js documentation
- TailwindCSS
- Framer Motion
- Other open-source libraries used in this project
