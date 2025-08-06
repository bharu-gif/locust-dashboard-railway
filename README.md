# Locust Dashboard Railway

A modern load testing dashboard with authentication, built with React and FastAPI.

## 🚀 Quick Start

### Local Development

1. **Backend (FastAPI)**:
```bash
cd metrics-api
pip install -r requirements.txt
uvicorn main:app --reload
```

2. **Frontend (React)**:
```bash
cd locust-dashboard
npm install
npm start
```

### Railway Deployment

1. **Deploy Backend**:
   - Connect your GitHub repo to Railway
   - Select the `metrics-api` folder as root directory
   - Set environment variables:
     ```
     DATABASE_URL=your_mysql_connection_string
     SECRET_KEY=your_jwt_secret_key
     ENVIRONMENT=production
     ```

2. **Deploy Frontend**:
   - Create another Railway service from the same repo
   - Select the `locust-dashboard` folder as root directory
   - Set environment variable:
     ```
     REACT_APP_API_URL=https://your-backend-url.railway.app
     ```

## 🔧 Configuration

### Environment Variables

**Backend**:
```env
DATABASE_URL=mysql+pymysql://user:password@host:port/database
SECRET_KEY=your-super-secret-jwt-key
ENVIRONMENT=production
```

**Frontend**:
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## 🐳 Docker Support

For local development with docker-compose:
```bash
docker-compose up --build
```

## 📊 Features

- **Authentication**: Secure login/signup with JWT
- **Dashboard**: Real-time metrics visualization  
- **Load Testing**: Integrated Locust controls
- **Modern UI**: Clean design with Material-UI
- **WebSocket**: Real-time data updates

## 📝 API Endpoints

- `POST /api/signup` - User registration
- `POST /api/login` - User authentication  
- `GET /api/users/me` - Get current user
- `POST /api/start-locust` - Start load testing
- `POST /api/stop-locust` - Stop load testing

## 📋 Troubleshooting

### Nginx Error: "host not found in upstream"
This error occurs when running the frontend container standalone. The nginx configuration has been updated to work with Railway deployment. Use the appropriate configuration:

- **Railway/Production**: Uses direct API calls to your Railway backend URL
- **Docker Compose**: Uses nginx proxy to backend container

### CORS Issues  
Update allowed origins in `metrics-api/main.py` to include your frontend domain.

See `DEPLOYMENT.md` for detailed deployment instructions.