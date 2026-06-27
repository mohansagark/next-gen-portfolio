import React from 'react';
import { ThemeProvider } from '@/context_api/ThemeContext';
import './globals.css';

const metadata = {
  title: 'Mohan Sagar - Full Stack Developer',
  description: 'A 3D portfolio website showcasing my work, skills, and experience in full-stack development.',
  openGraph: {
    title: 'Mohan Sagar - Full Stack Developer',
    description: 'A 3D portfolio website showcasing my work, skills, and experience.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
