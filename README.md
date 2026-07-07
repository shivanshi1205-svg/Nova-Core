# Nova-Core: Next-Generation AI Business Operating System

Nova-Core is an Awwwards-quality, enterprise-grade AI operating system built on the MERN stack (MongoDB, Express, React, Node.js). It features a highly interactive, futuristic 3D interface designed to manage advanced AI analytics, 3D data visualizations, and real-time collaboration.

## 🚀 Features

- **Awwwards-Quality UI:** Built with Framer Motion, GSAP, and Tailwind CSS for a premium, glassmorphic aesthetic inspired by Apple Vision Pro and Vercel.
- **Native 3D WebGL Environments:** Uses `@react-three/fiber` and `@react-three/drei` to render immersive, physics-based 3D geometries and glowing particle fields directly in the background.
- **Cinematic Micro-Interactions:** 
  - Magnetic physics-based navigation links.
  - Spotlight Command Palette (`Cmd+K`).
  - Staggered SVG curtain wipes for page transitions.
  - Holographic 3D Tilt Cards with dynamic glare tracking.
- **Buttery Smooth Scrolling:** Powered by the vanilla Lenis engine for an ultra-premium scrolling experience.
- **Robust MERN Backend:** Fully functional Node.js/Express backend with JWT Authentication, MongoDB schemas, and RESTful APIs for Projects, Tasks, and Analytics.

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- Three.js / React Three Fiber / Drei (3D Rendering)
- Framer Motion (Animations & Transitions)
- Tailwind CSS (Styling & Glassmorphism)
- Lenis (Smooth Scrolling)

### Backend
- Node.js & Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) & bcryptjs

## 💻 Local Development

### 1. Setup Backend
Navigate to the `backend` directory, install dependencies, and start the server:
```bash
cd backend
npm install
npm run dev
```

### 2. Setup Frontend
Navigate to the `frontend` directory, install dependencies, and start the Vite dev server:
```bash
cd frontend
npm install --legacy-peer-deps
npm run dev
```

## 🌐 Deployment
- **Backend:** Configured for seamless deployment to [Render](https://render.com/).
- **Frontend:** Configured for high-performance edge deployment on [Netlify](https://www.netlify.com/).
