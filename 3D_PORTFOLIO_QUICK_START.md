# 3D Portfolio - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install & Run
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📁 Key Files to Know

### Main Page
**File:** `/src/app/page.js`
```javascript
// Main entry point with all sections
// Import components from /src/components/sections/
```

### Sections
All main content sections in `/src/components/sections/`:
- `Hero3D.jsx` - Hero with 3D animations
- `Portfolio3D.jsx` - Project showcase
- `Skills3D.jsx` - Skills visualization
- `Contact3D.jsx` - Contact form

### Layout Components
In `/src/components/layout/`:
- `Navbar3D.jsx` - Top navigation bar
- `Footer3D.jsx` - Footer with links

### 3D Components
In `/src/components/3d/`:
- `Scene3D.jsx` - 3D canvas wrapper
- `Geometries.jsx` - 3D shapes (cube, sphere, etc.)

### Styling
- `/src/app/globals.css` - Global styles & theme variables
- Uses Tailwind CSS classes

### Data
**File:** `/src/data/adminData.js`
```javascript
// Contains all portfolio data:
// portfolioData - Projects
// skillsData - Skills
// servicesData - Services
// testimonialsData - Testimonials
// resumeData - Resume info
```

### Theme Context
**File:** `/src/context_api/ThemeContext.jsx`
```javascript
// Dark mode toggle and theme management
// Use: const { isDark, toggleTheme } = useTheme();
```

## 🎨 Common Customizations

### Update Your Info
Edit `/src/data/adminData.js`:
```javascript
export const resumeData = {
  personal: {
    name: "Your Name",
    email: "your@email.com",
    // ... more fields
  },
};
```

### Change Colors
Edit `/src/app/globals.css`:
```css
:root {
  --color-primary: #3b82f6;
  --color-primary-dark: #2563eb;
  /* ... more colors */
}
```

### Update Navigation Links
Edit `/src/components/layout/Navbar3D.jsx`:
```javascript
const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  // Add more items
];
```

### Add Social Links
Edit `/src/components/layout/Footer3D.jsx`:
```javascript
// Update social links and contact information
```

## 🔧 Development Tips

### Add a New 3D Shape
1. Create in `/src/components/3d/Geometries.jsx`:
```javascript
export function MyShape() {
  const meshRef = useRef();
  
  useFrame(() => {
    // Animation logic
  });
  
  return (
    <mesh ref={meshRef}>
      <geometryGeometry args={[...]} />
      <meshPhongMaterial color="#3b82f6" />
    </mesh>
  );
}
```

2. Use in `/src/components/sections/Hero3D.jsx`:
```javascript
<Scene3D>
  <MyShape />
</Scene3D>
```

### Modify Section Layout
Each section component is in `/src/components/sections/`:
- Uses `motion` from Framer Motion for animations
- Uses `useTheme()` for dark mode support
- Fully responsive with Tailwind

### Add a New Section
1. Create `/src/components/sections/NewSection.jsx`
2. Import in `/src/app/page.js`
3. Add to main page:
```javascript
<section id="new-section">
  <NewSection />
</section>
```

## 🎬 Animation Guide

### Using Framer Motion
```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Using useFrame for 3D
```javascript
import { useFrame } from '@react-three/fiber';

useFrame(() => {
  if (meshRef.current) {
    meshRef.current.rotation.x += 0.01;
  }
});
```

## 🌙 Dark Mode Implementation

Theme is automatically handled by context:
```javascript
import { useTheme } from '@/context_api/ThemeContext';

export function MyComponent() {
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <div className={isDark ? 'bg-slate-900' : 'bg-white'}>
      {/* Content */}
    </div>
  );
}
```

## 📱 Responsive Design

Using Tailwind breakpoints:
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
</div>
```

## 🔄 Form Handling

Contact form in `/src/components/sections/Contact3D.jsx`:
- Client-side validation
- Error messages
- Success feedback
- Loading state

## 🚀 Build & Deploy

### Local Build
```bash
npm run build      # Create production build
npm start          # Start production server
```

### Deploy to Vercel
```bash
vercel deploy --prod
```

### Deploy to Other Platforms
See `3D_PORTFOLIO_README.md` for detailed instructions.

## 🐛 Debugging

### React DevTools
Use React DevTools browser extension to inspect components.

### Three.js Inspector
Add to browser console:
```javascript
// Useful for debugging 3D scenes
```

### Performance
- Check Lighthouse scores: Dev Tools > Lighthouse
- Monitor bundle size: `npm run build` output
- Use Performance tab in Dev Tools

## 📚 Resources

- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Guide](https://threejs.org/manual/)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🆘 Common Issues

### 3D Scene Not Rendering
- Check browser console for errors
- Ensure Canvas component is mounted
- Check WebGL support in browser

### Animations Jerky
- Reduce number of particles
- Use `will-change` CSS sparingly
- Profile with Chrome DevTools

### Dark Mode Not Working
- Clear localStorage
- Check ThemeProvider is wrapping app
- Verify CSS custom properties

### Form Not Submitting
- Check console for validation errors
- Verify email field format
- Check network tab for requests

## 📝 File Structure Overview

```
src/
├── app/                           # Next.js app directory
│   ├── page.js                   # Main page
│   ├── layout.js                 # Root layout
│   └── globals.css               # Global styles
├── components/
│   ├── 3d/                       # 3D components
│   │   ├── Scene3D.jsx
│   │   └── Geometries.jsx
│   ├── layout/                   # Layout components
│   │   ├── Navbar3D.jsx
│   │   └── Footer3D.jsx
│   └── sections/                 # Page sections
│       ├── Hero3D.jsx
│       ├── Portfolio3D.jsx
│       ├── Skills3D.jsx
│       └── Contact3D.jsx
├── context_api/
│   └── ThemeContext.jsx          # Dark mode context
├── data/
│   └── adminData.js              # Portfolio content
└── hooks/                        # Custom hooks
```

## ✨ Next Steps

1. **Customize Content** - Update `/src/data/adminData.js`
2. **Add Your Projects** - Update portfolio data
3. **Change Colors** - Modify theme in `globals.css`
4. **Test** - Run `npm run dev` and test locally
5. **Deploy** - Push to master and deploy

---

**Questions?** Check the full README in `3D_PORTFOLIO_README.md`

Happy coding! 🚀
