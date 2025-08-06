# Production Deployment Guide

## 🚀 Railway Deployment (Recommended)

### 1. Connect Repository to Railway
1. Go to [Railway](https://railway.app)
2. Create new project from GitHub repo
3. Select this repository

### 2. Configure Environment Variables in Railway Dashboard
```
DATABASE_URL=mysql+pymysql://username:password@host:port/database
SECRET_KEY=your-super-secret-jwt-key-generate-a-long-random-string
ENVIRONMENT=production
```

### 3. Deploy Services
- **Backend (metrics-api)**: Railway will auto-detect and deploy
- **Frontend (locust-dashboard)**: Deploy as separate service

### 4. Get Your Database URL
For **Aiven MySQL**:
```
DATABASE_URL=mysql+pymysql://avnadmin:YOUR_PASSWORD@mysql-xxx.j.aivencloud.com:PORT/defaultdb?ssl_disabled=false
```

For **Railway MySQL** (if using Railway's database):
```
DATABASE_URL=mysql+pymysql://root:PASSWORD@containers-us-west-xxx.railway.app:PORT/railway
```

---

## 🐳 Docker Deployment

### 1. Build Images
```bash
# Backend
docker build -t metrics-api ./metrics-api

# Frontend  
docker build -t locust-dashboard ./locust-dashboard
```

### 2. Run with Environment Variables
```bash
# Backend
docker run -p 8000:8000 \
  -e DATABASE_URL="your_database_url_here" \
  -e SECRET_KEY="your_secret_key_here" \
  -e ENVIRONMENT="production" \
  metrics-api

# Frontend
docker run -p 3000:80 \
  -e REACT_APP_API_URL="https://your-api-domain.com" \
  locust-dashboard
```

---

## ☁️ Other Cloud Platforms

### Heroku
1. Create `Procfile` in metrics-api:
```
web: uvicorn main:app --host=0.0.0.0 --port=$PORT
```

2. Set environment variables:
```bash
heroku config:set DATABASE_URL="your_database_url"
heroku config:set SECRET_KEY="your_secret_key"
heroku config:set ENVIRONMENT="production"
```

### Vercel (Frontend Only)
1. Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "env": {
    "REACT_APP_API_URL": "https://your-api-domain.com"
  }
}
```

### AWS/GCP/Azure
Use their container services with the Docker images and set environment variables in their respective dashboards.

---

## 🔒 Security Best Practices

### 1. Generate Strong Secret Key
```python
import secrets
secret_key = secrets.token_urlsafe(32)
print(secret_key)
```

### 2. Database Connection Security
- Use SSL connections in production
- Restrict database access to your application IPs only
- Use connection pooling for better performance

### 3. CORS Configuration
Update the CORS origins in `main.py` to only include your actual frontend domains:
```python
allow_origins=[
    "https://your-frontend-domain.com",
    "https://your-frontend-domain.railway.app"
]
```

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | MySQL connection string | `mysql+pymysql://user:pass@host:port/db` |
| `SECRET_KEY` | JWT signing key | `your-super-secret-key` |
| `ENVIRONMENT` | Deployment environment | `production` or `development` |
| `REACT_APP_API_URL` | Backend API URL for frontend | `https://api.yourdomain.com` |

---

## 🔧 Troubleshooting

### Database Connection Issues
1. Check if DATABASE_URL is properly set
2. Verify database server is accessible
3. Ensure SSL settings match your database configuration

### CORS Errors
1. Update allowed origins in main.py
2. Ensure frontend URL is included in CORS configuration

### Secret Key Issues
1. Generate a new secret key using `secrets.token_urlsafe(32)`
2. Ensure it's properly set in environment variables
