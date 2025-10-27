# PWA Implementation Guide

## Features Implemented

### ✅ Core PWA Features

1. **Service Worker** (`/public/sw.js`)

   - Offline caching strategy
   - API response caching
   - Background sync support
   - Push notification ready

2. **Web App Manifest** (`/public/manifest.json`)

   - App name and icons
   - Theme colors (Emerald green)
   - Standalone display mode
   - Portrait orientation

3. **Install Prompt** (`/src/components/InstallPWA.jsx`)
   - Custom install banner
   - Dismissible for 7 days
   - Smooth animations
   - Auto-hide when already installed

### 📱 PWA Capabilities

#### Offline Support

- Static assets cached on first load
- API responses cached with expiration
- Offline fallback page available

#### Installable

- Add to Home Screen on Android
- Install from Chrome/Edge on Desktop
- iOS Web Clip support

#### App-like Experience

- Standalone mode (no browser UI)
- Custom splash screen
- Theme color matches app branding

### 🔧 Technical Details

#### Caching Strategy

- **Static Assets**: Cache First
- **API Calls**: Network First with fallback
- **Images**: Cache First with expiration

#### Service Worker Events

- `install`: Pre-cache static assets
- `activate`: Clean old caches
- `fetch`: Serve from cache or network
- `sync`: Background data synchronization
- `push`: Push notifications

### 🚀 Testing PWA

1. **Chrome DevTools**

   - Open DevTools → Application → Service Workers
   - Check "Offline" to test offline mode
   - Application → Manifest to verify manifest

2. **Lighthouse**

   - Run Lighthouse audit
   - Check PWA score
   - Verify all PWA criteria

3. **Install Test**
   - Desktop: Look for install icon in address bar
   - Android: "Add to Home Screen" from menu
   - iOS: "Add to Home Screen" from Share menu

### 📦 Build & Deploy

```bash
# Development with PWA
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### 🎨 Customization

#### Update Theme Color

Edit `manifest.json` and `index.html`:

```json
"theme_color": "#059669"
```

#### Update Icons

Place icons in `/public/favicon/`:

- `android-chrome-192x192.png`
- `android-chrome-512x512.png`
- `apple-touch-icon.png`

#### Modify Cache Strategy

Edit `vite.config.js` → `VitePWA.workbox.runtimeCaching`

### ✨ User Experience

1. **First Visit**

   - App loads normally
   - Service worker installs in background
   - Install prompt appears after 3 seconds

2. **Return Visit**

   - Instant load from cache
   - Content updates in background
   - Offline mode works automatically

3. **Offline**
   - Cached pages still accessible
   - API data from cache
   - Graceful fallback messages

### 🔔 Future Enhancements

- [ ] Push notifications for prayer times
- [ ] Background sync for bookmarks
- [ ] Periodic background sync for daily verses
- [ ] Web Share API integration
- [ ] File System Access API for exports

## Browser Support

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ⚠️ Safari (Limited - no install prompt)
- ✅ Samsung Internet (Full support)

## Notes

- Service worker requires HTTPS (or localhost)
- iOS has limited PWA support
- Install prompt only shows on mobile/Chrome desktop
- Cache is limited by browser quota
