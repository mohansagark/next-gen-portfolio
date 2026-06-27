'use client';

import React from 'react';
import { Navbar3D } from '@/components/layout/Navbar3D';
import { Footer3D } from '@/components/layout/Footer3D';
import { Hero3D } from '@/components/sections/Hero3D';
import { Portfolio3D } from '@/components/sections/Portfolio3D';
import { Skills3D } from '@/components/sections/Skills3D';
import { Contact3D } from '@/components/sections/Contact3D';

export default function Home() {
  return (
    <>
      <Navbar3D />
      
      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home">
          <Hero3D />
        </section>

        {/* Portfolio Section */}
        <section id="portfolio">
          <Portfolio3D />
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Skills3D />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Contact3D />
        </section>
      </main>

      {/* Footer */}
      <Footer3D />
    </>
  );
}
