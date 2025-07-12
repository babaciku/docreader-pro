# DocReader Pro - Deployment Guide

## 🚀 Quick Start Deployment

### Option 1: Frontend Only (Recommended for Testing)
Deploy just the document reader with offline dictionary functionality.

```bash
# 1. Build the production version
cd docreader-pro
npm run build

# 2. Deploy the dist/ folder to any static hosting service
# - Netlify: Drag and drop the dist/ folder
# - Vercel: Connect GitHub repo and auto-deploy
# - GitHub Pages: Upload dist/ contents to gh-pages branch
```

**Features Available:**
- ✅ Document reading and viewing
- ✅ Offline dictionary (58K+ words)
- ✅ Word pronunciation and vocabulary saving
- ✅ Mobile-optimized interface
- ❌ AI features (requires backend)

### Option 2: Full-Stack Deployment
Deploy both frontend and backend for complete functionality.

#### Frontend Deployment
```bash
# Build and deploy frontend
cd docreader-pro
npm run build
# Deploy dist/ folder to static hosting
```

#### Backend Deployment (Heroku Example)
```bash
# 1. Prepare backend for deployment
cd docreader-ai-backend

# 2. Create Procfile
echo "web: python src/main.py" > Procfile

# 3. Deploy to Heroku
heroku create docreader-ai-backend
git init
git add .
git commit -m "Initial deployment"
heroku git:remote -a docreader-ai-backend
git push heroku main
```

#### Update Frontend Configuration
```javascript
// Update aiService.js baseURL to your deployed backend
const baseURL = 'https://your-backend-url.herokuapp.com/api/ai';
```

## 🌐 Hosting Platform Options

### Static Hosting (Frontend Only)

#### Netlify (Recommended)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `dist/` folder
3. Get instant URL: `https://random-name.netlify.app`
4. Custom domain available

#### Vercel
1. Connect GitHub repository
2. Auto-deploy on push
3. Serverless functions available for backend
4. Custom domain included

#### GitHub Pages
1. Upload `dist/` contents to `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Access at `https://username.github.io/repository`

### Backend Hosting

#### Heroku
- **Pros**: Easy deployment, free tier available
- **Cons**: Cold starts, limited free hours
- **Best for**: Development and testing

#### DigitalOcean App Platform
- **Pros**: Predictable pricing, good performance
- **Cons**: No free tier
- **Best for**: Production deployment

#### AWS/Google Cloud
- **Pros**: Scalable, many services
- **Cons**: Complex setup, variable pricing
- **Best for**: Enterprise deployment

## 📱 Mobile App Deployment

### Progressive Web App (PWA)
Convert to installable mobile app:

```javascript
// Add to public/manifest.json
{
  "name": "DocReader Pro",
  "short_name": "DocReader",
  "description": "Lightweight document reader with AI",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### Capacitor (Native Apps)
For iOS/Android app stores:

```bash
# Install Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android

# Initialize Capacitor
npx cap init DocReaderPro com.yourcompany.docreader

# Build and sync
npm run build
npx cap sync

# Open in Xcode/Android Studio
npx cap open ios
npx cap open android
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```bash
VITE_API_BASE_URL=https://your-backend-url.com/api
VITE_APP_NAME=DocReader Pro
VITE_APP_VERSION=1.0.0
```

#### Backend (.env)
```bash
FLASK_ENV=production
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=https://your-frontend-url.com
AI_SERVICE_TIMEOUT=30
```

### Dictionary Configuration
```javascript
// Customize dictionary loading
const dictionaryConfig = {
  maxEntries: 10000,        // Limit for performance
  cacheSize: 1000,          // LRU cache size
  enablePronunciation: true, // Text-to-speech
  autoLookup: true          // Automatic word lookup
};
```

## 🔐 Security Configuration

### CORS Setup
```python
# In Flask backend
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    'https://your-frontend-domain.com',
    'https://your-app.netlify.app'
])
```

### Content Security Policy
```html
<!-- Add to index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';
               connect-src 'self' https://your-backend-url.com;">
```

## 📊 Performance Optimization

### Build Optimization
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@radix-ui/react-dialog']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}
```

### CDN Configuration
```html
<!-- Preload critical resources -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preconnect" href="https://your-backend-url.com">
```

## 🔍 Monitoring & Analytics

### Error Tracking
```javascript
// Add Sentry for error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production"
});
```

### Performance Monitoring
```javascript
// Add performance tracking
if ('performance' in window) {
  window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`App loaded in ${loadTime}ms`);
    
    // Send to analytics service
    analytics.track('app_load_time', { duration: loadTime });
  });
}
```

## 🧪 Testing Before Deployment

### Pre-deployment Checklist
- [ ] All features work in production build
- [ ] Dictionary loads correctly
- [ ] AI features work (if backend deployed)
- [ ] Mobile responsiveness verified
- [ ] Performance metrics acceptable
- [ ] Error handling works properly
- [ ] HTTPS enabled
- [ ] CORS configured correctly

### Testing Commands
```bash
# Test production build locally
cd docreader-pro
npm run build
npm run preview

# Test backend API
curl https://your-backend-url.com/api/ai/health

# Performance testing
npm install -g lighthouse
lighthouse https://your-app-url.com --view
```

## 🔄 Continuous Deployment

### GitHub Actions (Example)
```yaml
# .github/workflows/deploy.yml
name: Deploy DocReader Pro

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Netlify
      uses: nwtgck/actions-netlify@v1.2
      with:
        publish-dir: './dist'
        production-branch: main
      env:
        NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
        NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

## 🆘 Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### CORS Issues
```javascript
// Temporary fix for development
const aiService = {
  baseURL: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5000/api/ai'
    : 'https://your-backend-url.com/api/ai'
};
```

#### Dictionary Not Loading
```javascript
// Check dictionary files are accessible
fetch('/dictionary_files/a.json')
  .then(response => console.log('Dictionary accessible:', response.ok))
  .catch(error => console.error('Dictionary error:', error));
```

### Performance Issues
```javascript
// Enable performance monitoring
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.duration > 100) {
      console.warn('Slow operation:', entry.name, entry.duration);
    }
  }
});
observer.observe({entryTypes: ['measure', 'navigation']});
```

## 📞 Support

### Getting Help
- **Documentation**: Check the main documentation file
- **Issues**: Create GitHub issues for bugs
- **Community**: Join discussions for feature requests
- **Professional**: Contact for custom deployment assistance

### Maintenance
- **Updates**: Regular dependency updates
- **Security**: Monitor for security vulnerabilities
- **Performance**: Regular performance audits
- **Backup**: Regular backup of user data and configurations

---

**Ready to deploy DocReader Pro!** 🚀

Choose your deployment option and follow the steps above. For any issues, refer to the troubleshooting section or contact support.

