# Auto-Update Workflow

## Cara Kerja Sistem Update Otomatis

### 1️⃣ Development (npm run dev)

- Version tetap: `v1.0.0-dev`
- Service Worker tidak di-generate ulang
- Tidak ada version checking
- Hot reload seperti biasa

### 2️⃣ Production Build (npm run build)

- Version otomatis di-generate: `v1.0.0-20251027-143022`
- Format: `v{package.version}-{YYYYMMDD}-{HHMMSS}`
- `version.json` dibuat dengan timestamp build
- Service Worker di-inject dengan version baru

### 3️⃣ Deploy ke Server

```bash
# 1. Build production
npm run build

# 2. Push ke Git
git add .
git commit -m "feat: tambah fitur baru"
git push origin main

# 3. Deploy (otomatis via Vercel/Netlify)
# Atau manual copy folder dist/ ke server
```

### 4️⃣ Auto-Update Flow

```
User membuka app
    ↓
Service Worker cek versi
    ↓
Bandingkan dengan /version.json
    ↓
Version berbeda?
    ↓ YES
Tampilkan banner update
    ↓
User klik "Update"
    ↓
Reload & load versi baru
```

## File-file Penting

### 1. `vite-plugin-version.js`

Plugin custom untuk inject version saat build:

```javascript
// Hanya jalan saat: npm run build
// Generate version dari package.json + timestamp
```

### 2. `public/sw.js`

Service Worker dengan version checking:

```javascript
const CACHE_VERSION = "v1.0.0-20251027-143022"; // Auto-replace saat build
```

### 3. `public/version.json`

File version info (auto-generate saat build):

```json
{
  "version": "v1.0.0-20251027-143022",
  "buildDate": "2025-10-27T14:30:22.000Z",
  "environment": "production"
}
```

### 4. `src/main.jsx`

Registration & update handling:

```javascript
// Deteksi update baru
// Tampilkan banner
// Handle reload
```

## Timeline Update

### Immediate Check (saat buka app)

```javascript
registration.update(); // Check langsung
```

### Periodic Check (setiap 1 jam)

```javascript
setInterval(() => {
  registration.update();
}, 60 * 60 * 1000);
```

### Background Check (setiap 6 jam)

```javascript
// Di service worker
setInterval(checkForUpdate, 6 * 60 * 60 * 1000);
```

## UI Update Banner

### Banner Style

```javascript
✨ Update tersedia!
[Update] [Nanti]
```

### Posisi: Top center

### Animasi: Slide down

### Auto-dismiss: Jika klik "Nanti"

### Auto-reload: Jika klik "Update"

## Testing Update Flow

### Step 1: Build Pertama

```bash
npm run build
# Version: v1.0.0-20251027-140000
```

### Step 2: Deploy & Install

```bash
# User install PWA
# Service Worker: v1.0.0-20251027-140000
```

### Step 3: Update Fitur

```javascript
// Edit code (tambah fitur)
// Commit changes
```

### Step 4: Build Kedua

```bash
npm run build
# Version: v1.0.0-20251027-150000 (timestamp baru!)
```

### Step 5: Deploy Update

```bash
# Push ke server
# User buka app → banner muncul
# Klik update → reload → versi baru!
```

## Version Format

### Development

```
v1.0.0-dev
```

### Production

```
v{major}.{minor}.{patch}-{YYYYMMDD}-{HHMMSS}

Contoh:
v1.0.0-20251027-143022
v1.2.3-20251128-091530
```

## Cache Strategy

### Static Assets (v1.0.0-xxx-static)

- HTML, CSS, JS
- Fonts, Icons
- Cache first strategy

### Dynamic Content (v1.0.0-xxx-dynamic)

- Images
- User uploads
- Cache first strategy

### API Responses (v1.0.0-xxx-api)

- Quran data
- Prayer times
- Network first strategy

## Update Changelog

Setiap build baru, version berubah:

```
v1.0.0-20251027-140000 → Initial release
v1.0.0-20251027-150000 → Added masjid feature
v1.0.0-20251027-160000 → Fixed dzikir counter
v1.1.0-20251028-100000 → Major update (bump minor)
```

## Troubleshooting

### Update tidak muncul?

1. Clear browser cache
2. Unregister service worker
3. Hard refresh (Ctrl+Shift+R)

### Versi tidak berubah?

1. Pastikan jalankan `npm run build`
2. Check `dist/version.json` exists
3. Check console log version

### Banner muncul terus?

1. Check service worker state
2. Reload paksa sekali
3. Clear local storage

## Git Workflow

### Recommended Flow

```bash
# 1. Development
npm run dev
# Edit code...

# 2. Test
npm run build
npm run preview

# 3. Commit
git add .
git commit -m "feat: tambah fitur X"

# 4. Push
git push origin main

# 5. Auto-deploy (via Vercel/Netlify)
# User akan dapat notif update!
```

## Environment Variables

### Production

```env
NODE_ENV=production
VITE_APP_VERSION=auto  # Auto-generate
```

### Development

```env
NODE_ENV=development
VITE_APP_VERSION=dev
```

## Monitoring

### Check Current Version

```javascript
// Console
navigator.serviceWorker.controller.postMessage({
  type: "GET_VERSION",
});
```

### Check Version File

```bash
curl https://your-domain.com/version.json
```

### Service Worker Status

```javascript
navigator.serviceWorker
  .getRegistrations()
  .then((regs) => console.log(regs[0].active));
```

---

**Ringkasan:**
✅ Development: Version tidak berubah
✅ Build Production: Version auto-generate
✅ Deploy: User dapat notif update
✅ Click Update: Reload & versi baru aktif
