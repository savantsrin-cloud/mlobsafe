import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import KnowSignsPage from './pages/KnowSignsPage';
import ProtectYourselfPage from './pages/ProtectYourselfPage';
import WhyItMattersPage from './pages/WhyItMattersPage';
import AboutContactPage from './pages/AboutContactPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState('km'); // default Khmer
  const [waterCups, setWaterCups] = useState(3);
  const waterRef = useRef(null);

  const handleOpenWaterTimer = () => {
    if (activePage !== 'home') {
      setActivePage('home');
      setTimeout(() => {
        const el = document.getElementById('water-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('water-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800">
      {/* Sticky Header with Khmer/English Switcher and Emergency Hotlines */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        lang={lang}
        setLang={setLang}
        onOpenWaterTimer={handleOpenWaterTimer}
        unreadWaterCount={waterCups}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8 md:py-12">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            setActivePage={setActivePage}
            waterCups={waterCups}
            setWaterCups={setWaterCups}
            waterRef={waterRef}
          />
        )}
        {activePage === 'signs' && (
          <KnowSignsPage lang={lang} />
        )}
        {activePage === 'protect' && (
          <ProtectYourselfPage lang={lang} />
        )}
        {activePage === 'why' && (
          <WhyItMattersPage lang={lang} />
        )}
        {activePage === 'about' && (
          <AboutContactPage lang={lang} />
        )}
      </main>

      {/* Public Health Campaign Footer */}
      <Footer
        lang={lang}
        setActivePage={setActivePage}
      />
    </div>
  );
}
