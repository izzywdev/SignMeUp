# SignMeUp 🚀

**Intelligent Identity & Account Management System**

SignMeUp is a sophisticated automation platform that intelligently manages multiple digital identities and automates account creation across various websites. Built with modern technologies, it features encrypted data storage, AI-powered automation scripts, and a beautiful React frontend.

## ✨ Features

### 🔐 **Secure Identity Management**
- **Multiple Digital Identities**: Create and manage separate identities for different use cases (professional, personal, etc.)
- **Encrypted Storage**: All sensitive data is encrypted using industry-standard encryption
- **Master Key Protection**: User-controlled encryption keys for maximum security

### 🤖 **Intelligent Automation**
- **Smart Signup Scripts**: AI-powered automation that adapts to different website forms
- **CAPTCHA Handling**: Advanced CAPTCHA detection and solving capabilities
- **Email Verification**: Automated email verification workflows
- **Form Analysis**: Intelligent form field detection and completion

### 💬 **AI Assistant**
- **Chat Interface**: Natural language interaction for account management
- **Contextual Responses**: AI understands your automation needs and provides relevant suggestions
- **Guided Workflows**: Step-by-step assistance for complex tasks

### 📊 **Comprehensive Dashboard**
- **Account Overview**: Real-time status of all your accounts across platforms
- **Success Metrics**: Track automation success rates and performance
- **Activity Logs**: Detailed logging of all automation activities

## 🏗️ Architecture

### Backend (Python/FastAPI)
- **FastAPI Framework**: High-performance async API
- **SQLAlchemy ORM**: Async database operations with SQLite/PostgreSQL support
- **Playwright Integration**: Web automation and browser control
- **OpenAI Integration**: AI-powered chat assistant and form analysis
- **Cryptography**: Advanced encryption for sensitive data

### Frontend (React/TypeScript)
- **React 18**: Modern React with hooks and context
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling framework
- **React Router**: Client-side routing
- **Responsive Design**: Works on desktop and mobile

### Database
- **SQLite**: Local development and small deployments
- **PostgreSQL**: Production-ready scalable storage
- **Encrypted Fields**: Sensitive data is encrypted at the field level
- **Async Operations**: Non-blocking database operations

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 18+**
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/SignMeUp.git
   cd SignMeUp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   python -m venv venv
   
   # Windows
   .\venv\Scripts\activate
   
   # macOS/Linux
   source venv/bin/activate
   
   pip install -r requirements.txt
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

4. **Initialize Database**
   ```bash
   cd backend
   python -c "import asyncio; from app.database import init_database; asyncio.run(init_database())"
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   python working_server.py
   ```
   Backend will be available at: `http://localhost:8002`

2. **Start Frontend (in a new terminal)**
   ```bash
   cd frontend
   npm start
   ```
   Frontend will be available at: `http://localhost:3000`

## 📁 Project Structure

```
SignMeUp/
├── backend/                 # Python FastAPI backend
│   ├── app/
│   │   ├── models/         # SQLAlchemy database models
│   │   ├── routers/        # API route handlers
│   │   ├── utils/          # Utility functions (encryption, logging)
│   │   ├── database.py     # Database configuration
│   │   └── main.py         # FastAPI application
│   ├── data/               # SQLite database files
│   ├── requirements.txt    # Python dependencies
│   └── working_server.py   # Standalone server script
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React contexts
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json        # Node.js dependencies
└── docker-compose.yml      # Docker configuration
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL_ASYNC=postgresql+asyncpg://username:password@localhost/signmeup

# Security
MASTER_KEY_SALT=your_secure_salt_here
SECRET_KEY=your_secret_key_here

# OpenAI (optional)
OPENAI_API_KEY=your_openai_api_key

# Application
DEBUG=True
HOST=localhost
PORT=8002
```

## 🛡️ Security Features

- **End-to-End Encryption**: All sensitive data is encrypted before storage
- **Master Key Control**: Users control their own encryption keys
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing
- **SQL Injection Protection**: Parameterized queries and ORM protection
- **CORS Configuration**: Properly configured cross-origin resource sharing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🚧 Development Status

**Current Version**: 1.0.0

### ✅ Completed Features
- Identity management with encryption
- Account tracking and status monitoring
- Basic automation framework
- React frontend with responsive design
- SQLite database with async operations
- AI chat assistant
- Comprehensive API documentation

### 🔄 In Progress
- Advanced automation scripts
- Email verification automation
- CAPTCHA solving integration
- Enhanced AI capabilities

### 📋 Planned Features
- Browser extension
- Mobile application
- Advanced analytics
- Team collaboration features
- Enterprise authentication (SSO)

## 🐛 Known Issues

- Browser automation requires Playwright browser installation
- Some websites have advanced bot detection
- Email verification depends on email provider APIs

## 📞 Support

For questions and support:
- Create an issue on GitHub
- Check the documentation
- Review existing issues and discussions

## 🙏 Acknowledgments

- **FastAPI** - For the amazing async web framework
- **React** - For the powerful frontend library
- **Playwright** - For reliable web automation
- **SQLAlchemy** - For excellent ORM capabilities
- **Tailwind CSS** - For beautiful, responsive styling

---

**Built with ❤️ for automating the tedious parts of the web** 