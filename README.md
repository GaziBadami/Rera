# RERA Portal - UI Template

Beautiful Next.js 14 + Tailwind CSS UI for India's unified RERA database.

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

If npm install fails due to network issues, try:
```bash
npm install --registry https://registry.npmmirror.com
```

Or clear cache and retry:
```bash
npm cache clean --force
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
rera-portal/
├── app/
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components (add here)
├── lib/                   # Utilities (add here)
├── public/                # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Features

- ✅ Beautiful gradient hero section
- ✅ Real-time search bar
- ✅ Interactive state cards
- ✅ Stats dashboard
- ✅ Responsive design
- ✅ Smooth animations
- ✅ Professional color scheme

## 📝 Next Steps

1. Add state detail pages
2. Create data tables component
3. Add project detail views
4. Connect to MySQL database
5. Build API routes

## 🛠️ Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons

---

**Note**: This is the UI template. Backend/database connection will be added in next steps.
