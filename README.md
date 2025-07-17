# 🚀 Next-Gen Portfolio

A modern, responsive portfolio website built with Next.js 15, featuring dynamic blog management, multiple homepage layouts, and a comprehensive design system.

![Next.js](https://img.shields.io/badge/Next.js-15.1.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript)

## ✨ Features

### 🎨 **Multiple Homepage Layouts**

- 10 unique homepage variants (home-2 through home-10)
- Customizable hero sections and layouts
- Responsive design across all devices

### 📝 **Dynamic Blog System**

- **MDX-Powered**: Write blogs in MDX format with frontmatter support
- **Auto-Generation**: Automatic conversion from MDX to JSON
- **Rich Content**: Support for code blocks, images, and interactive components
- **SEO Optimized**: Meta tags, structured data, and social sharing
- **Tag & Category System**: Organized content with filtering capabilities

### 🛠 **Advanced Components**

- **Portfolio Gallery**: Filterable project showcase
- **Services Section**: Highlight your offerings
- **Testimonials**: Client feedback carousel
- **Skills & Resume**: Professional experience display
- **Contact Forms**: Integrated contact functionality

### 🌙 **Modern UX/UI**

- **Dark/Light Mode**: Seamless theme switching
- **Smooth Animations**: GSAP and CSS animations
- **Interactive Elements**: Vanilla Tilt, Intersection Observer
- **Mobile-First**: Responsive design principles

### ⚡ **Performance Optimized**

- **Next.js 15**: Latest features and optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic bundle optimization
- **Analytics Ready**: Vercel Analytics integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohansagark/next-gen-portfolio.git
   cd next-gen-portfolio
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Generate blog data**

   ```bash
   yarn generate:blogs
   ```

4. **Start development server**

   ```bash
   yarn dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
next-gen-portfolio/
├── 📂 public/
│   ├── 📄 blogs.json              # Generated blog data
│   ├── 📂 img/                    # Static images
│   └── 📂 fakedata/               # Demo data files
├── 📂 src/
│   ├── 📂 app/                    # Next.js app directory
│   │   ├── 📄 page.js             # Homepage
│   │   ├── 📂 blogs/              # Blog routes
│   │   │   ├── 📄 page.js         # Blog listing
│   │   │   └── 📂 [slug]/         # Dynamic blog pages
│   │   ├── 📂 portfolio/          # Portfolio pages
│   │   ├── 📂 services/           # Services pages
│   │   └── 📂 home-{2-10}/        # Alternative homepages
│   ├── 📂 blog/posts/             # MDX blog files
│   ├── 📂 components/             # React components
│   │   ├── 📂 layout/             # Layout components
│   │   ├── 📂 sections/           # Page sections
│   │   └── 📂 shared/             # Reusable components
│   ├── 📂 context_api/            # React contexts
│   ├── 📂 hooks/                  # Custom React hooks
│   └── 📂 libs/                   # Utility functions
├── 📂 scripts/
│   └── 📄 convert-mdx-to-json.mjs # Blog generation script
└── 📄 package.json
```

## ✍️ Blog Management

### Writing Blog Posts

1. **Create MDX file** in `src/blog/posts/`

   ```markdown
   ---
   title: "Your Blog Title"
   subtitle: "Brief description"
   summary: "Detailed summary for SEO and previews"
   slug: "your-blog-slug"
   date: "2025-01-17"
   content_strategy: "Technical tutorials and coding tips"
   writing_style: "energetic and practical"
   tags: '["javascript", "react", "nextjs"]'
   image_url: "https://example.com/image.jpg"
   source_url: "https://original-source.com"
   ---

   # Your Blog Content

   Write your blog content here using Markdown and JSX!
   ```

2. **Generate blog data**

   ```bash
   yarn generate:blogs
   ```

3. **Blog Features**
   - ✅ Automatic slug generation
   - ✅ Tag and category extraction
   - ✅ Key takeaways extraction
   - ✅ SEO metadata generation
   - ✅ Image optimization
   - ✅ Social sharing

### Blog Structure

Each blog post includes:

- **Frontmatter**: Metadata and configuration
- **Content**: Main blog content in MDX
- **Auto-generated**: Tags, categories, key points
- **Navigation**: Previous/next blog links
- **Social**: Sharing buttons and metadata

## 🎨 Customization

### Homepage Layouts

Switch between different homepage styles:

- `/` - Default homepage
- `/home-2` through `/home-10` - Alternative layouts

### Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Modular design system
- **Theme Configuration**: Easy color and typography changes

### Content Management

- **Static Data**: JSON files in `public/fakedata/`
- **Dynamic Content**: MDX blog posts
- **Images**: Optimized with Next.js Image component

## 🔧 Available Scripts

| Command               | Description                             |
| --------------------- | --------------------------------------- |
| `yarn dev`            | Start development server with Turbopack |
| `yarn build`          | Build production application            |
| `yarn start`          | Start production server                 |
| `yarn lint`           | Run ESLint code analysis                |
| `yarn generate:blogs` | Convert MDX files to JSON               |

## 📦 Dependencies

### Core

- **Next.js 15.1.2**: React framework
- **React 19.0.0**: UI library
- **TailwindCSS 3.4.1**: Styling framework

### Animation & Interaction

- **GSAP 3.12.7**: Advanced animations
- **WOW.js**: Scroll animations
- **Vanilla Tilt**: 3D tilt effects
- **Swiper**: Touch sliders

### Utilities

- **Gray Matter**: MDX frontmatter parsing
- **Isotope Layout**: Filterable layouts
- **React Intersection Observer**: Scroll detection
- **Nice Select**: Custom select components

## 🚀 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure build settings:
   - Build Command: `yarn build`
   - Output Directory: `.next`
3. Deploy automatically on push

### Manual Deployment

```bash
yarn build
yarn start
```

## 🔧 Configuration

### Environment Variables

Create `.env.local` for environment-specific settings:

```env
NEXT_PUBLIC_SITE_URL=https://devmohan.in
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

### Next.js Configuration

Customize `next.config.mjs` for:

- Image domains
- Redirects
- Headers
- Performance optimizations

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohan Sagar**

- GitHub: [@mohansagark](https://github.com/mohansagark)
- Website: [devmohan.in](https://devmohan.in)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS
- [Vercel](https://vercel.com/) for hosting and deployment
- All open-source contributors

---

⭐ **Star this repository if you found it helpful!**

🐛 **Found a bug?** [Open an issue](https://github.com/mohansagark/next-gen-portfolio/issues)

💡 **Have a suggestion?** [Start a discussion](https://github.com/mohansagark/next-gen-portfolio/discussions)
