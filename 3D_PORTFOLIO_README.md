# 🌐 3D Portfolio Website

A stunning, immersive portfolio website built with cutting-edge web technologies. This 3D portfolio showcases projects, skills, and expertise in a unique and engaging way.

## ✨ Features

- **🎨 3D Interactive Experience** - Built with Three.js and React Three Fiber
- **🌙 Dark Mode Support** - Seamless theme switching with localStorage persistence
- **📱 Fully Responsive** - Perfect on mobile, tablet, and desktop devices
- **⚡ High Performance** - Optimized loading times and smooth animations
- **🎭 Smooth Animations** - Powered by Framer Motion for delightful interactions
- **🎯 Modern Design** - Professional corporate styling with gradients and effects
- **📧 Contact Form** - Functional contact form with validation
- **🎪 Portfolio Gallery** - Interactive project showcase with filtering
- **📊 Skills Visualization** - Beautiful skills display with proficiency levels
- **♿ Accessibility First** - WCAG compliant with proper semantic HTML

## 🛠 Tech Stack

### Frontend
- **React 19** - Latest React with hooks and modern patterns
- **Next.js 16** - Server-side rendering and static generation
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js & React Three Fiber** - 3D graphics rendering
- **Framer Motion** - Smooth animations and transitions
- **Zustand** - Lightweight state management

### Styling & Animation
- **Tailwind CSS** - Responsive utility classes
- **CSS Custom Properties** - Theme variables for dark mode
- **Framer Motion** - Advanced animation library

### Development Tools
- **ESLint** - Code quality and consistency
- **PostCSS** - CSS transformations
- **Turbopack** - Fast development server

## 📋 Sections

### 1. Hero Section
- Animated 3D geometries
- Dynamic particle system
- Welcome message with CTA buttons
- Responsive typography

### 2. Portfolio Gallery
- Interactive project cards
- Category filtering
- Project detail modal
- Technology tags display
- Live links and GitHub repositories

### 3. Skills Section
- Skill proficiency visualization
- Category filtering
- Experience information
- Featured skills highlighting

### 4. Contact Section
- Contact form with validation
- Contact information display
- Social media links
- Success message feedback

### 5. Navigation
- Fixed responsive navbar
- Mobile menu with animations
- Dark mode toggle
- Smooth scroll links

### 6. Footer
- Quick navigation links
- Social media links
- Contact information
- Scroll-to-top button

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/next-gen-portfolio.git
   cd next-gen-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Utilities
npm run lint         # Run ESLint
npm run generate:blogs  # Generate blog data from MDX

# Deployment
npm run deploy:build # Build and export for deployment
```

## 📁 Project Structure

```
src/
├── app/
│   ├── css/                  # Global styles
│   ├── fonts/                # Font files
│   ├── layout.js             # Root layout with providers
│   ├── page.js               # Main page
│   └── globals.css           # Global CSS
├── components/
│   ├── 3d/
│   │   ├── Geometries.jsx    # 3D geometric shapes
│   │   └── Scene3D.jsx       # 3D scene wrapper
│   ├── layout/
│   │   ├── Navbar3D.jsx      # Navigation component
│   │   └── Footer3D.jsx      # Footer component
│   └── sections/
│       ├── Hero3D.jsx        # Hero section
│       ├── Portfolio3D.jsx   # Portfolio showcase
│       ├── Skills3D.jsx      # Skills section
│       └── Contact3D.jsx     # Contact form
├── context_api/
│   └── ThemeContext.jsx      # Dark mode context
├── data/
│   └── adminData.js          # Portfolio data
└── hooks/                    # Custom React hooks
```

## 🎨 Customization

### Update Portfolio Data
Edit `/src/data/adminData.js` to update:
- Portfolio projects
- Skills and expertise
- Services offered
- Testimonials
- Resume information

### Change Colors & Theme
Modify `/src/app/globals.css`:
- Update CSS custom properties
- Change primary colors
- Adjust theme variables

### Update Contact Email
In `/src/components/sections/Contact3D.jsx`:
- Update email address
- Modify form fields as needed
- Add email service integration

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences but can be toggled using the button in the navbar. Preference is saved to localStorage.

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ⚡ Performance Optimization

### Implemented optimizations:
- Code splitting and lazy loading
- Image optimization with WebP format
- CSS-in-JS minimization
- Three.js optimization for 3D rendering
- Font optimization with system fonts
- Caching headers for static assets

### Lighthouse Scores Target:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

## ♿ Accessibility

- WCAG 2.1 Level AA compliance
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance

## 🔐 Security

- CSP headers configured
- XSS protection headers
- Clickjacking prevention
- Secure by default
- No sensitive data in environment files

## 📊 SEO

- Semantic HTML
- Meta tags optimization
- Open Graph support
- Structured data ready
- Sitemap generation ready
- robots.txt support

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### GitHub Pages
```bash
npm run export
# Push dist/ to GitHub Pages branch
```

### Self-hosted (Node.js)
```bash
npm run build
npm start
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mohan Sagar** - Full Stack Developer
- GitHub: [@mohansagark](https://github.com/mohansagark)
- Email: hello@mohansagar.dev
- Website: [mohansagar.dev](https://mohansagar.dev)

## 🙏 Acknowledgments

- React Three Fiber for 3D rendering
- Framer Motion for animations
- Tailwind CSS for styling
- Next.js team for the amazing framework
- All open-source contributors

## 📞 Support

Have questions or need help? 
- Open an issue on GitHub
- Check the documentation
- Contact via email

---

Made with ❤️ by Mohan Sagar
