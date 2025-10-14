# PICT Placement Management System

A comprehensive placement management system for PICT College built with React.js, Node.js, Express.js, and MySQL.

## 🚀 Features

### For Students
- **Profile Management**: Complete academic and personal profile
- **Job Applications**: Browse and apply for job openings
- **Application Tracking**: Track application status and feedback
- **Company Information**: View detailed company profiles
- **Resume Upload**: Upload and manage resume documents

### For Administrators
- **Dashboard**: Comprehensive analytics and statistics
- **Student Management**: Manage student profiles and data
- **Company Management**: Add and manage company information
- **Job Management**: Create and manage job postings
- **Application Management**: Review and update application statuses
- **Placement Reports**: Generate placement statistics and reports

### System Features
- **Authentication**: Secure JWT-based authentication
- **Role-based Access**: Student and Admin portals
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Live data updates and notifications
- **File Management**: Resume and document upload system

## 🛠️ Technology Stack

### Frontend
- **React.js 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling and validation
- **React Hot Toast** - Notification system

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MySQL 8.0** - Relational database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Multer** - File upload handling

### Security
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API rate limiting
- **Input Validation** - Request validation

## 📁 Project Structure

```
Jr_dbms project/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Application pages
│   │   ├── context/       # React context
│   │   ├── utils/         # Helper functions
│   │   └── hooks/         # Custom hooks
│   └── package.json
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── utils/            # Server utilities
│   ├── config/           # Configuration files
│   └── package.json
├── database/             # Database scripts
│   └── schema.sql        # Database schema
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **MySQL** (v8.0 or higher)
- **npm** (v8 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Jr_dbms project"
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Setup MySQL Database**
   - Start MySQL service
   - Create a new database user (recommended)
   ```sql
   CREATE USER 'placement_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON *.* TO 'placement_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. **Configure Environment Variables**
   
   **Server (.env)**:
   ```bash
   cd ../server
   cp .env.example .env
   # Edit .env with your database credentials
   ```
   
   **Client (.env)**:
   ```bash
   cd ../client
   cp .env.example .env
   # Edit .env if needed (optional for development)
   ```

6. **Initialize Database**
   ```bash
   cd ../server
   npm run init-db
   ```

7. **Start the Application**
   
   **Terminal 1 - Start Server**:
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Start Client**:
   ```bash
   cd client
   npm start
   ```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## 👤 Default Admin Account

After database initialization, use these credentials to access the admin panel:

- **Email**: admin@pict.edu
- **Password**: admin123
- **Login Type**: Admin

## 📊 Database Schema

The system includes the following main tables:

- **students** - Student profiles and academic information
- **companies** - Company information and contacts
- **job_postings** - Job opportunities and requirements
- **applications** - Student job applications
- **placement_drives** - Campus recruitment drives
- **admin_users** - System administrators
- **notifications** - System notifications
- **system_settings** - Application configuration

## 🔧 Development Scripts

### Server Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run init-db    # Initialize database
npm test           # Run tests
```

### Client Scripts
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

## 🔐 API Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login** to get a token
2. **Include token** in Authorization header: `Bearer <token>`
3. **Token expires** in 7 days (configurable)

## 📱 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - Student registration
- `POST /api/auth/forgot-password` - Password reset request

### Students
- `GET /api/students/profile` - Get student profile
- `PUT /api/students/profile` - Update profile
- `GET /api/students/applications` - Get applications

### Jobs
- `GET /api/jobs` - Get job listings
- `GET /api/jobs/:id` - Get job details
- `POST /api/jobs/:id/apply` - Apply for job

### Admin
- `GET /api/admin/dashboard` - Dashboard data
- `GET /api/admin/students` - Manage students
- `PUT /api/admin/applications/:id/status` - Update application status

## 🚀 Deployment

### Production Build
```bash
# Build client
cd client
npm run build

# The build folder contains production-ready files
```

### Environment Variables
Set these environment variables in production:
- `NODE_ENV=production`
- `JWT_SECRET=<strong-secret-key>`
- `DB_HOST=<production-db-host>`
- `DB_PASSWORD=<secure-password>`

## 🧪 Testing

Run tests for both client and server:
```bash
# Server tests
cd server
npm test

# Client tests
cd client
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Future Enhancements

- Email notification system
- Advanced reporting and analytics
- Mobile application
- Integration with external job portals
- AI-powered job recommendations
- Video interview scheduling
- Bulk operations for admin users

---

**Made with ❤️ for PICT College Placement Cell**
