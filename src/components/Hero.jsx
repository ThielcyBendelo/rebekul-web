import useParallax from '../hooks/useParallax';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import LazyImage from './LazyImage';
import { useEffect, useState } from 'react';
import { profile1Image } from '../assets/assets.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaBalanceScale, FaLightbulb, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- SECTION EXPERTISES ---
const Expertises = () => (
  <section className="py-24 bg-white text-slate-900 px-6">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif mb-16 border-l-4 border-amber-600 pl-6 text-left">Piliers d'Impact</h2>
      <div className="grid md:grid-cols-3 gap-12 text-left">
        {[
          { 
            title: "Défense Juridique", 
            icon: <FaBalanceScale className="text-amber-600 mb-4" size={24} />,
            desc: "Protection de vos droits et conseils stratégiques au sein de notre cabinet d'avocats." 
          },
          { 
            title: "Coaching Entrepreneurial", 
            icon: <FaLightbulb className="text-amber-600 mb-4" size={24} />,
            desc: "Accompagnement des femmes et entrepreneurs pour bâtir des projets à fort impact." 
          },
          { 
            title: "Édition & Littérature", 
            icon: <FaBookOpen className="text-amber-600 mb-4" size={24} />,
            desc: "Ouvrages dédiés à l'éveil de la jeunesse africaine et au leadership féminin." 
          }
        ].map((service, i) => (
          <div key={i} className="group cursor-pointer border-b border-slate-100 pb-8 hover:border-amber-600 transition-all">
            {service.icon}
            <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{service.title}</h3>
            <p className="text-slate-600 font-light leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- SECTION QUOTE ---
const Quote = () => (
  <section className="py-24 bg-slate-950 text-white text-center italic font-light px-6">
    <div className="max-w-4xl mx-auto">
      <p className="text-2xl md:text-3xl leading-snug font-serif">
        "Le véritable leadership réside dans la capacité à transformer les lois en justice, les idées en entreprises et la jeunesse en héritage pour l'Afrique."
      </p>
      <div className="mt-8 h-px w-20 bg-amber-600 mx-auto"></div>
    </div>
  </section>
);

export default function Hero() {
  const scrollY = useParallax();
  const [elementRef] = useIntersectionObserver();
  const navigate = useNavigate();

  // Données synchronisées : chaque slide a son image, son badge, son titre et sa description
  const slides = [
    {
      image: '/background1.jpeg',
      badge: 'AVOCATE • BARREAU DE KINSHASA/GOMBE',
      title: 'Rebecca Kulufio',
      description: 'Défendre vos intérêts juridiques avec rigueur et excellence au sein du Barreau de la Gombe.'
    },
    {
      image: '/background2.jpeg',
      badge: 'MENTOR • LEADERSHIP FÉMININ',
      title: 'Accompagnement & Impact',
      description: 'Éveiller le potentiel des femmes entrepreneures et guider la nouvelle génération de juristes.'
    },
    {
      image: '/background3.jpeg',
      badge: 'AUTEUR • CONFÉRENCIÈRE',
      title: 'Plume & Transmission',
      description: 'Des ouvrages engagés pour l’éveil de la jeunesse africaine et le partage d’expérience.'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Défilement automatique toutes les 6 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <>
      <section
        ref={elementRef}
        id="home"
        className="relative min-h-screen flex flex-col justify-between items-center text-center py-12 md:py-16 px-6 overflow-hidden bg-slate-900"
      >
        {/* Background Dynamique Plus Clair */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slides[currentIndex].image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              // Luminosité augmentée à 0.65 pour un fond plus clair et visible
              filter: 'brightness(0.65) contrast(105%)',
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
        </AnimatePresence>

        {/* Overlay léger pour garantir la lisibilité du texte blanc sans assombrir la photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40 z-10" />

        {/* 1. BADGE FLOTTANT SUPÉRIEUR (Style maquette) */}
        <div className="relative z-20 mt-6">
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-amber-600/20">
            <LazyImage
              src={profile1Image}
              alt="Rebecca Kulufio"
              className="w-10 h-10 rounded-full object-cover border border-amber-600"
              style={{ objectPosition: 'center 15%' }}
            />
            <div className="text-left pr-2">
              <p className="text-slate-900 font-bold text-xs md:text-sm leading-tight">Rebecca Kulufio</p>
              <p className="text-amber-600 font-bold text-[10px] uppercase tracking-wider">Barreau de Gombe</p>
            </div>
          </div>
        </div>

        {/* 2. FLÈCHES DE NAVIGATION LATÉRALES (< et >) */}
        <button
          onClick={prevSlide}
          aria-label="Slide précédente"
          className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white/70 hover:text-amber-500 transition-colors focus:outline-none"
        >
          <FaChevronLeft size={28} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Slide suivante"
          className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 text-white/70 hover:text-amber-500 transition-colors focus:outline-none"
        >
          <FaChevronRight size={28} />
        </button>

        {/* 3. CONTENU TEXTUEL DÉFILANT + BOUTONS CONSERVÉS */}
        <div className="relative z-20 max-w-4xl w-full my-auto pt-16 pb-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Pilule de catégorie dynamique */}
              <span className="inline-block px-4 py-1.5 mb-5 bg-amber-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] rounded shadow-md">
                {slides[currentIndex].badge}
              </span>

              {/* Titre dynamique */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold mb-4 text-white leading-tight drop-shadow-md">
                {slides[currentIndex].title}
              </h1>

              {/* Description dynamique */}
              <p className="text-base md:text-xl text-slate-100 max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow">
                {slides[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Actions Ciblées (Structure et couleurs conservées) */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-lg sm:max-w-none mx-auto">
            <button
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto px-10 py-4 bg-amber-600 text-white font-bold uppercase text-xs tracking-widest hover:bg-amber-700 transition-all shadow-xl shadow-amber-900/40 rounded-sm"
            >
              Expertises & Services
            </button>
            
            <button
              onClick={() => navigate('/books')}
              className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-bold uppercase text-xs tracking-widest hover:bg-slate-200 transition-all shadow-xl rounded-sm"
            >
              Découvrir mes Livres
            </button>
          </div>
        </div>

        {/* 4. INDICATEURS DE PAGINATION (Points de défilement) */}
        <div className="relative z-20 flex items-center gap-2.5 mb-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Aller à la diapositive ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? 'w-8 bg-amber-600' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      <Expertises />
      <Quote />
    </>
  );
}
