# Deployment Guide - Buku Doa Kecil

## 📦 Deployment Scripts

Aplikasi ini dilengkapi dengan automated deployment script yang akan:

- Auto-increment version number
- Update Service Worker cache version
- Build project untuk production
- Create git commit
- Notify users tentang update tersedia

## 🚀 Cara Menggunakan

### Deployment dengan Patch Version (1.0.0 → 1.0.1)

```bash
npm run deploy
```

Gunakan untuk bug fixes dan perubahan kecil.

### Deployment dengan Minor Version (1.0.0 → 1.1.0)

```bash
npm run deploy:minor
```

Gunakan untuk fitur baru yang backward-compatible.

### Deployment dengan Major Version (1.0.0 → 2.0.0)

```bash
npm run deploy:major
```

Gunakan untuk breaking changes atau major updates.

## 📋 Proses yang Terjadi

1. **Version Increment** - Script akan otomatis menaikkan version number di `package.json`
2. **Service Worker Update** - Cache version di `public/sw.js` akan di-update
3. **Version JSON** - File `public/version.json` akan dibuat/update dengan info build
4. **Build Project** - Menjalankan `npm run build` untuk compile production files
5. **Git Commit** - Membuat commit dengan pesan "chore: release vX.X.X"

## 🔄 Service Worker Update Flow

### Untuk Developer:

1. Jalankan `npm run deploy` (atau variant lainnya)
2. Push ke repository: `git push origin main`
3. Deploy folder `dist/` ke hosting (Vercel, Netlify, dll)

### Untuk User:

1. Service Worker otomatis check update setiap jam
2. Ketika ada version baru, muncul banner notifikasi
3. User bisa klik "Update" atau "Nanti"
4. Jika update, aplikasi reload dan menggunakan version terbaru
5. Cache lama otomatis dibersihkan

## 📁 Files yang Dimodifikasi

- `package.json` - Version number
- `public/sw.js` - Cache version constant
- `public/version.json` - Build info dan timestamp
- `dist/` - Production build files

## 🔧 Manual Deployment

Jika ingin deploy manual tanpa auto-increment:

```bash
# Build saja
npm run build

# Test build locally
npm run preview
```

## 💡 Tips

1. **Sebelum Deploy**: Test di local dengan `npm run dev`
2. **Setelah Build**: Preview dengan `npm run preview`
3. **Version Strategy**:
   - Patch (x.x.X): Bug fixes, typos, small improvements
   - Minor (x.X.x): New features, new pages, major improvements
   - Major (X.x.x): Complete redesign, breaking changes
4. **Cache Strategy**: Service Worker akan otomatis update, tidak perlu manual clear cache
5. **Testing**: Setelah deploy, test di Incognito/Private mode

## 🐛 Troubleshooting

### Service Worker tidak update?

- Pastikan `version.json` berisi version baru
- Hard refresh browser (Ctrl+Shift+R atau Cmd+Shift+R)
- Cek Console untuk error messages

### Build gagal?

- Check error messages di terminal
- Pastikan semua dependencies ter-install: `npm install`
- Cek syntax errors dengan: `npm run lint`

### Version tidak berubah?

- Pastikan `scripts/deploy.js` executable
- Check file permissions
- Jalankan manual: `node scripts/deploy.js patch`

## 📝 Example Workflow

```bash
# 1. Develop fitur baru
npm run dev

# 2. Test perubahan
# ... test di browser ...

# 3. Deploy dengan minor version
npm run deploy:minor

# 4. Push ke repository
git push origin main

# 5. Deploy ke hosting
# Upload folder dist/ ke Vercel/Netlify/dll
```

## 🎯 Best Practices

1. **Commit regularly** - Jangan tunggu terlalu banyak changes
2. **Test before deploy** - Selalu test di local dulu
3. **Versioning semantic** - Follow semantic versioning (semver)
4. **Changelog** - Document changes di commit message
5. **Backup** - Simpan backup sebelum major updates

## 📧 Support

Jika ada masalah atau pertanyaan:

- Email: taufiqqhidayatt@gmail.com
- Telegram: @taufiq_h
- GitHub Issues: [Repository URL]

---

Dibuat dengan ❤️ untuk memudahkan deployment aplikasi
