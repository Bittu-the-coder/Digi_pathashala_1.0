# Digi Pathshala - Digital Learning Platform

![Digi Pathshala](https://i.imgur.com/placeholder-image.png)

## Overview

Digi Pathshala is a comprehensive digital learning platform that connects students with expert teachers. The platform facilitates online education through live classes, course management, and interactive learning tools, making quality education accessible to everyone.

## Features

### For Students

- **Course Management**: Browse, enroll, and manage courses
- **Live Classes**: Join and participate in live online classes
- **Attendance Tracking**: Monitor personal attendance records across courses
- **Progress Monitoring**: Track learning progress with detailed analytics
- **Teacher Exploration**: Find and connect with expert teachers
- **Resource Access**: Download educational resources and study materials

### For Teachers/Admins

- **Course Creation**: Create and manage course content
- **Live Class Scheduling**: Plan and host live teaching sessions
- **Student Management**: Track student enrollment and performance
- **Attendance Management**: Record and review student attendance
- **Analytics Dashboard**: Access comprehensive teaching statistics
- **Performance Tracking**: Monitor course effectiveness and student engagement

## Tech Stack

### Frontend

- **Framework**: React.js with Vite
- **Styling**: TailwindCSS
- **State Management**: React Context API
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: Swagger

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/digi_pathashala_1.0.git
cd digi_pathashala_1.0
```

2. Install frontend dependencies

```bash
npm install
# or
yarn install
```

3. Install backend dependencies

```bash
cd backend
npm install
# or
yarn install
```

4. Configure environment variables

Create a `.env` file in the root directory for frontend:

```
VITE_API_URL=http://localhost:4000/api
```

Create a `.env` file in the backend directory:

```
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
EMAIL_SERVICE=your_email_service
EMAIL_USERNAME=your_email_username
EMAIL_PASSWORD=your_email_password
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_PUBLIC_KEY=your_emailjs_public_key
EMAILJS_PRIVATE_KEY=your_emailjs_private_key
```

5. Start the development servers

Frontend:

```bash
npm run dev
# or
yarn dev
```

Backend:

```bash
cd backend
npm run dev
# or
yarn dev
```

## Project Structure

```
digi_pathashala_1.0/
├── src/                  # Frontend source code
│   ├── components/       # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   ├── student/      # Student-specific components
│   │   └── common/       # Shared components
│   ├── context/          # React context providers
│   ├── pages/            # Page components
│   │   ├── admin/        # Admin pages
│   │   └── student/      # Student pages
│   └── assets/           # Static assets
├── backend/              # Backend source code
│   ├── src/              # Backend source files
│   │   ├── controllers/  # API controllers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── config/       # Configuration files
│   └── package.json      # Backend dependencies
└── package.json          # Frontend dependencies
```

## Key Features Implementation

### Authentication

- Separate flows for students and teachers/admins
- JWT-based authentication
- Password reset functionality with email verification
- Role-based access control

### Course Management

- Browse and filter available courses
- Enroll in courses with progress tracking
- Create and edit courses (for teachers)
- Upload and manage course materials

### Live Classes

- Schedule and manage live sessions
- Real-time attendance tracking
- Meeting link integration
- Filtering by subject and date

### Attendance System

- Mark and track attendance per class
- View attendance statistics and reports
- Course-wise attendance breakdown
- Attendance record visualization

### Analytics

- Student performance tracking
- Course completion rates
- Attendance statistics
- Teacher effectiveness metrics

### User Profiles

- Student profiles with learning statistics
- Teacher profiles with teaching statistics
- Profile customization options

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The application can be deployed using various platforms:

- Frontend: Vercel, Netlify, or GitHub Pages
- Backend: Heroku, AWS, or Digital Ocean

## Future Enhancements

- Mobile application development
- Integrated assessment system
- AI-powered learning recommendations
- Discussion forums and community features
- Payment gateway integration for premium courses
- Advanced video conferencing features

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Project Link: [https://github.com/yourusername/digi_pathashala_1.0](https://github.com/yourusername/digi_pathashala_1.0)
- Website: [https://digipathashala.com](https://digipathashala.com)

## Acknowledgments

- React.js documentation
- TailwindCSS
- Framer Motion
- MongoDB
- Express.js
- Node.js
- All other open-source libraries used in this project
