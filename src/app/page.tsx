'use client';

import React, { useState } from 'react';
import LoadingScreen from '@/components/sections/LoadingScreen';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import AcademicCommunitySection from '@/components/sections/AcademicCommunitySection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ui/ImageModal';
import PdfModal from '@/components/ui/PdfModal';
import ProjectModal from '@/components/ui/ProjectModal';
import ChatBotDrawer from '@/components/ui/ChatBotDrawer';
import { ProjectItem } from '@/types/portfolio';

export default function Home() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    imageSrc: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    imageSrc: '',
    title: '',
    subtitle: '',
  });

  const [pdfModalState, setPdfModalState] = useState<{
    isOpen: boolean;
    pdfUrl: string;
    title: string;
    subtitle?: string;
  }>({
    isOpen: false,
    pdfUrl: '',
    title: '',
    subtitle: '',
  });

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const handleOpenModal = (image: { src: string; title: string; subtitle?: string }) => {
    setModalState({
      isOpen: true,
      imageSrc: image.src,
      title: image.title,
      subtitle: image.subtitle,
    });
  };

  const handleCloseModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleOpenCvModal = () => {
    setPdfModalState({
      isOpen: true,
      pdfUrl: '/cv.pdf',
      title: 'Curriculum Vitae • M. Sohibbal',
      subtitle: 'Teknik Informatika • Universitas Riau (IPK 3.81)',
    });
  };

  const handleClosePdfModal = () => {
    setPdfModalState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="relative min-h-screen bg-background text-text-primary selection:bg-accent-soft selection:text-accent-brand">
      {/* 1. Kinetic Monogram Loading Screen */}
      <LoadingScreen />

      {/* 2. Sticky Glass Navbar & Theme Switcher */}
      <Navbar />

      {/* 3. Main Content Sections */}
      <main className="relative z-10">
        <HeroSection onOpenCv={handleOpenCvModal} />
        <AboutSection />
        <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        <ExperienceSection onSelectImage={handleOpenModal} />
        <CertificatesSection onSelectImage={handleOpenModal} />
        <AcademicCommunitySection onSelectImage={handleOpenModal} />
        <ContactSection />
      </main>

      {/* 4. Footer */}
      <Footer />

      {/* 5. Image Lightbox Modal */}
      <ImageModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        imageSrc={modalState.imageSrc}
        title={modalState.title}
        subtitle={modalState.subtitle}
      />

      {/* 6. PDF Document Modal for CV */}
      <PdfModal
        isOpen={pdfModalState.isOpen}
        onClose={handleClosePdfModal}
        pdfUrl={pdfModalState.pdfUrl}
        title={pdfModalState.title}
        subtitle={pdfModalState.subtitle}
      />

      {/* 7. Detailed Project Architecture Modal */}
      <ProjectModal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />

      {/* 8. Floating RAG Chatbot Assistant (Bottom Right) */}
      <ChatBotDrawer />
    </div>
  );
}
